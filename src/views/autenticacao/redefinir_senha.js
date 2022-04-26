import { View, Text, Image } from 'react-native'
import React, {useState} from 'react'

import * as LoginService from '../../services/auth'

import styles from './styles'

import {
  TextInput,
  Button
} from "react-native-paper";

export default function Redefinir_senha({ navigation }) {

  const [email, setEmail] = useState(); 
  const [msg, setMsg] = useState("");


  const redefinirSenha = () => {
    if (email === undefined ) {
      setMsg("Informe seu email");
    } else {
      LoginService.forgotPassword(email)
        .then(() => {
          setMsg("Link para redefinir senha enviado!")
        })
        .catch((erro) => {
          setMsg(erro);
        });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginBox}>
        <Image source={require('../../repositories/images/Logo_TI.png')}
          style={styles.logoImage} />
        <Text>
          Redefinir senha
        </Text>
        <View>
          <TextInput
            style={styles.inputs}
            label="Email"
            keyboardType="email-address"
            value={email}
            mode="outlined"
            onChangeText={(value) => setEmail(value)}
          />   
        </View>   
        <View >
          <Button style={[styles.buttonRedefinir,{marginTop: 30}]} mode="outlined" onPress={redefinirSenha}>
            Enviar email
          </Button>
          <Button style={styles.buttonRedefinir} mode="contained" onPress={() => { navigation.goBack() }}>
            Voltar
          </Button>
        </View>
        <View>
          <Text style={{ color: "red", margin: 10, justifyContent: "center" }}>{msg}</Text>
        </View>  
      </View>

    </View>
  );
}