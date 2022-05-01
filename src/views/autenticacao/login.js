import { View, Text, Image } from 'react-native'
import React, { useLayoutEffect, useEffect, useState, useCallback } from 'react'

import { useFocusEffect } from "@react-navigation/native";

import * as userAction from "../../store/action";
import { useDispatch } from "react-redux";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
    TextInput,
    Button,
    Checkbox,
    ActivityIndicator,
    Colors
} from "react-native-paper";

import styles from './styles'

import * as LoginService from '../../services/auth'


export default function Login({ navigation }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState();
    const [checked, setChecked] = useState(false);
    const [msg, setMsg] = useState("");

    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    useLayoutEffect(() => {
        const getUsernameAndPassord = async () => {
            let email = await AsyncStorage.getItem("email");
            let senha = await AsyncStorage.getItem("senha");
            if (email) {
                setEmail(email);
                setChecked(true);
            }
            if (senha) setPassword(senha);
        };
        getUsernameAndPassord();
        return setLoading(false)
    }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setMsg("")
        });
        return unsubscribe;
    }, [navigation]);

    useFocusEffect(
        useCallback(() => {
            setLoading(false)
        }, []))

    const validarCredenciais = () => {
        if (email === undefined && password === undefined) {
            setMsg("Informe seu email e senha para entrar");
        } else {
            setLoading(true)
            LoginService.login(email, password, checked)
                .then(() => {
                    dispatch(userAction.getUser(email.toLowerCase()));
                    navigation.navigate("perfil", { propsEmail: email.toLowerCase() });
                })
                .catch((erro) => {
                    setLoading(false)
                    switch (erro) {
                        case 'The password is invalid or the user does not have a password.':
                            setMsg('Usuário ou senha inválidos!');
                            break;
                        case 'There is no user record corresponding to this identifier. The user may have been deleted.':
                            setMsg('Email não encontrado na base de dados!');
                            break;
                        case 'The email address is badly formatted.':
                            setMsg('O formato do seu email é inválido!');
                            break;
                        default:
                            setMsg('Erro de conexão. Tente mais tarde.');
                            break;
                    }
                })
        }
    };

    return (
        <View style={styles.container}>
            {
                loading ?
                    <View>
                        <ActivityIndicator
                            style={{ marginTop: 0 }}
                            animating={true}
                            color={Colors.green500}
                            size="large"
                        />
                    </View>
                    :
                    <View style={styles.loginBox}>
                        <Image source={require('../../repositories/images/Logo_TI.png')}
                            style={styles.logoImage} />
                        <View>
                            <TextInput
                                style={styles.inputs}
                                label="Email"
                                keyboardType="email-address"
                                value={email}
                                mode="outlined"
                                onChangeText={(value) => setEmail(value)}
                            />
                            <TextInput
                                style={styles.inputs}
                                label="Senha"
                                secureTextEntry={true}
                                value={password}
                                mode="outlined"
                                onChangeText={(value) => setPassword(value)}
                            />
                        </View>
                        <View style={styles.checkBox}>
                            <Text style={{ color: "#02A859" }}>Lembrar email e senha</Text>
                            <Checkbox
                                status={checked ? "checked" : "unchecked"}
                                uncheckedColor="#02A859"
                                onPress={() => {
                                    setChecked(!checked);
                                }}
                            />
                        </View>
                        <View style={styles.buttonBox}>
                            <Button
                                style={{ width: 280 }}
                                mode="outlined" onPress={validarCredenciais}>
                                Entrar
                            </Button>
                        </View>
                        <View style={styles.buttonBox}>
                            <Button
                                style={{ width: 280 }}
                                mode="contained"
                                onPress={() => navigation.navigate("registro")}
                            >
                                Ainda não fiz meu cadastro
                            </Button>
                        </View>
                        <View>
                            <Text style={{ color: "red", margin: 10, justifyContent: "center" }}>{msg}</Text>
                        </View>
                        <View>
                            <Text style={{
                                color: "#02A859",
                                fontSize: 16
                            }}
                                onPress={() => {
                                    navigation.navigate("redefinir")
                                }}>
                                Redefinir minha senha
                            </Text>
                        </View>
                    </View>
            }
        </View>
    );
}