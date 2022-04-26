import { View, Text } from "react-native";
import React, { useState } from "react";

import {
  TextInput,
  Button,
  ActivityIndicator,
  Colors,
} from "react-native-paper";

import styles from "./styles";

import * as LoginService from "../../services/auth";
import * as UserServices from "../../services/userServices";

export default function Registro({ navigation }) {
  const [nome, setNome] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [loginButton, setLoginButton] = useState(false);

  const validarCredenciais = () => {
    if (nome === undefined || email === undefined || password === undefined) {
      setMsg("Informe o nome, email e senha para cadastrar");
    } else {
      LoginService.createUser(email, password)
        .then(() => {
          cadastrarUsuario(nome, email);
          setLoading(true);
        })
        .catch((erro) => {
          setMsg(erro);
        });
    }
  };

  const cadastrarUsuario = (nome, email) => {
    const data = {
      email: email,
      fez_aposta: false,
      nome: nome,
      perfil: "USER",
      tempo_ti: {
        anos: null,
        meses: null,
      },
      urlImage: null,
    };
    UserServices.saveUser(email, data)
      .then(() => {
        setLoading(false);
        setMsg("Dados cadastrados com sucesso!");
        setLoginButton(true);
      })
      .catch((erro) => {
        setMsg(erro);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginBox}>
        <Text>Cadastre aqui o seu usuário</Text>
        {loading ? (
          <View>
            <ActivityIndicator
              style={{ marginTop: 15 }}
              animating={true}
              color={Colors.green500}
              size="large"
            />
          </View>
        ) : (
          <View style={styles.loginBox}>
            <View>
              <TextInput
                style={styles.inputs}
                label="Nome completo"
                value={nome && nome}
                mode="outlined"
                onChangeText={(value) => setNome(value)}
              />
              <TextInput
                style={styles.inputs}
                label="Email"
                keyboardType="email-address"
                value={email && email}
                mode="outlined"
                onChangeText={(value) => setEmail(value)}
              />
              <TextInput
                style={styles.inputs}
                label="Senha"
                secureTextEntry={true}
                value={password && password}
                mode="outlined"
                onChangeText={(value) => setPassword(value)}
              />
            </View>
            <View style={styles.buttonBoxCadaster}>
              <Button
                style={[styles.buttonCadaster,{marginTop: 30}]}
                mode="contained"
                onPress={validarCredenciais}
              >
                Cadastrar
              </Button>
            </View>
          </View>
        )}
      </View>
      <View>
        <Text style={{ color: "red", margin: 10 }}>{msg}</Text>
      </View>
      <View>
        {loginButton && (
          <Button
            mode="outlined"
            onPress={() => {
              navigation.goBack();
            }}
          >
            Voltar para Login
          </Button>
        )}
      </View>
    </View>
  );
}
