import { View, Text } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'

import { Appbar } from 'react-native-paper'

import * as LoginService from '../services/auth'


export default function Header({ navigation, labels }) {

  const user = useSelector((user) => user);

  const getIcon = () => {
    if (user !== undefined) {
      switch (user.perfil) {
        case 'DEV':
          return "alpha-d-box-outline";
        case 'USER':
          return "alpha-u-box-outline";      
        default:
          return '';
      }
    }
  }

  const exit = () => {
    LoginService.logout()
      .then(() => {
        navigation.navigate("login")
      }).catch(erro => {
        console.log(erro)
      })
  }

  return (
    <Appbar.Header>
      <Appbar.Action icon={getIcon()} onPress={() => { }} />
      <Appbar.Content title={labels} subtitle={user && user.nome} />
      <Appbar.Action icon="exit-run" onPress={exit} />
    </Appbar.Header>
  )
}