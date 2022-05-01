import React, { useState, useEffect } from "react"
import { View, Text, ScrollView } from 'react-native'
import { useSelector } from 'react-redux'

import * as userAction from "../../../store/action";
import * as UserService from '../../../services/userServices'
import { useDispatch } from "react-redux"

import RNPickerSelect from "react-native-picker-select"

import Header from '../../../components/header'
import styles from "./styles"

import {
  Button
} from "react-native-paper"


export default function Cadastro({ navigation }) {

  // Dados do usuário da store
  const user = useSelector((user) => user);

  const [times, setTimes] = useState([
    { label: 'Flamengo', value: 'Flamengo', },
    { label: 'Santos', value: 'Santos', },
    { label: 'Palmeiras', value: 'Palmeiras', },
    { label: 'América-MG', value: 'América-MG', },
    { label: 'Athletico-PR', value: 'Athletico-PR', },
    { label: 'Atlético-GO', value: 'Atlético-GO', },
    { label: 'Atlético-MG', value: 'Atlético-MG', },
    { label: 'Avaí', value: 'Avaí', },
    { label: 'Botafogo', value: 'Botafogo', },
    { label: 'Ceará', value: 'Ceará', },
    { label: 'Corinthians', value: 'Corinthians', },
    { label: 'Coritiba', value: 'Coritiba', },
    { label: 'Cuiaba', value: 'Cuiaba', },
    { label: 'São Paulo', value: 'São Paulo', },
    { label: 'Fluminense', value: 'Fluminense', },
    { label: 'Fortaleza', value: 'Fortaleza', },
    { label: 'Goiás', value: 'Goiás', },
    { label: 'Internacional', value: 'Internacional', },
    { label: 'Juventude', value: 'Juventude', },
    { label: 'Bragantino', value: 'Bragantino', },
  ])

  const [msg, setMsg] = useState()
  const [aposta, setAposta] = useState({
    '1°': "Selecione o campeão",
    '2°': "Selecione o vice-campeão",
    '3°': "Selecione o terceiro",
    '4°': "Selecione o quarto",
    '5°': "Selecione o quinto",
    '6°': "Selecione o sexto",
    '17°': "Selecione o 17°",
    '18°': "Selecione o 18°",
    '19°': "Selecione o 19°",
    '20°': "Selecione o 20°"
  })

  let timesSelecionados = [];

  const dispatch = useDispatch();

  const setValoresAposta = (posicao, time) => {
    timesSelecionados.push(time)
    setAposta(state => ({
      ...state, [posicao]: time,
    }))
    let estadoNovo = times.filter((f) => !timesSelecionados.includes(f.label))
    setTimes(estadoNovo)
  }

  const saveUserBet = async () => {
    const valores = {
      nome: user.nome,
      tempo_anos: user.tempo_ti.anos,
      tempo_meses: user.tempo_ti.meses,
      aposta: aposta
    }
    await UserService.saveUserBet(user.email, valores).then(() => {
      setMsg("Apostas salvas. Boa sorte!")
    }).catch((err) => {
      setMsg(`Ocorreu um erro: ${err.message}`)
    })
    await UserService.updateFieldUser(user.email).then(() => {
      setMsg("Seu usuário foi atualizado")
    }).catch((err) => {
      setMsg(`Ocorreu um erro: ${err.message}`)
    })
    dispatch(userAction.getUser(user.email));
  }

  return (
    <React.Fragment>
      <Header navigation={navigation} labels={title = "Cadastro de aposta"} />
      <View style={styles.container}>
        <Text style={styles.title}>{`Olá ${user && user.nome}`}</Text>
        <Text style={{ marginBottom: 15 }}>Cadastre sua aposta</Text>

        {
          msg ?
            <View>
              <Text style={[styles.title, { marginLeft: 45 }]}>{msg}</Text>
              <View>
                <Button
                  style={styles.button}
                  mode='outlined'
                  onPress={() => { navigation.goBack() }}
                ><Text>Voltar para o perfil</Text>
                </Button>
              </View>
            </View>
            :
            <View style={styles.secondContainer}>
              <ScrollView>

                <View style={styles.inputAndroid}>
                  <RNPickerSelect
                    placeholder={{
                      label: aposta["1°"],
                      value: aposta["1°"],
                      color: '#1F2021',
                    }}
                    items={times}
                    onValueChange={value => { setValoresAposta('1°', value) }}
                    value={aposta["1°"]}
                    style={styles.inputAndroid}
                  />
                </View>
                <View style={styles.inputAndroid}>
                  <RNPickerSelect
                    placeholder={{
                      label: aposta["2°"],
                      value: aposta["2°"],
                      color: '#1f2021',
                    }}
                    items={times}
                    onValueChange={value => { setValoresAposta('2°', value) }}
                    value={aposta["2°"]}
                    style={styles.inputAndroid}
                  />
                </View>
                <View style={styles.inputAndroid}>
                  <RNPickerSelect
                    placeholder={{
                      label: aposta["3°"],
                      value: aposta["3°"],
                      color: '#1f2021',
                    }}
                    items={times}
                    onValueChange={value => { setValoresAposta('3°', value) }}
                    value={aposta["3°"]}
                    style={styles.inputAndroid}
                  />
                </View>
                <View style={styles.inputAndroid}>
                  <RNPickerSelect
                    placeholder={{
                      label: aposta["4°"],
                      value: aposta["4°"],
                      color: '#1f2021',
                    }}
                    items={times}
                    onValueChange={value => { setValoresAposta('4°', value) }}
                    value={aposta["4°"]}
                    style={styles.inputAndroid}
                  />
                </View>
                <View style={styles.inputAndroid}>
                  <RNPickerSelect
                    placeholder={{
                      label: aposta["5°"],
                      value: aposta["5°"],
                      color: '#1f2021',
                    }}
                    items={times}
                    onValueChange={value => { setValoresAposta('5°', value) }}
                    value={aposta["5°"]}
                    style={styles.inputAndroid}
                  />
                </View>
                <View style={styles.inputAndroid}>
                  <RNPickerSelect
                    placeholder={{
                      label: aposta["6°"],
                      value: aposta["6°"],
                      color: '#1f2021',
                    }}
                    items={times}
                    onValueChange={value => { setValoresAposta('6°', value) }}
                    value={aposta["6°"]}
                    style={styles.inputAndroid}
                  />
                </View>
                <View style={styles.inputAndroid}>
                  <RNPickerSelect
                    placeholder={{
                      label: aposta["17°"],
                      value: aposta["17°"],
                      color: '#1f2021',
                    }}
                    items={times}
                    onValueChange={value => { setValoresAposta('17°', value) }}
                    value={aposta["17°"]}
                    style={styles.inputAndroid}
                  />
                </View>
                <View style={styles.inputAndroid}>
                  <RNPickerSelect
                    placeholder={{
                      label: aposta["18°"],
                      value: aposta["18°"],
                      color: '#1f2021',
                    }}
                    items={times}
                    onValueChange={value => { setValoresAposta('18°', value) }}
                    value={aposta["18°"]}
                    style={styles.inputAndroid}
                  />
                </View>
                <View style={styles.inputAndroid}>
                  <RNPickerSelect
                    placeholder={{
                      label: aposta["19°"],
                      value: aposta["19°"],
                      color: '#1f2021',
                    }}
                    items={times}
                    onValueChange={value => { setValoresAposta('19°', value) }}
                    value={aposta["19°"]}
                    style={styles.inputAndroid}
                  />
                </View>
                <View style={styles.inputAndroid}>
                  <RNPickerSelect
                    placeholder={{
                      label: aposta["20°"],
                      value: aposta["20°"],
                      color: '#1f2021',
                    }}
                    items={times}
                    onValueChange={value => { setValoresAposta('20°', value) }}
                    value={aposta["20°"]}
                    style={styles.inputAndroid}
                  />
                </View>

                <Button
                  style={styles.button}
                  mode='contained'
                  onPress={() => { saveUserBet() }}
                ><Text>Salvar apostas</Text>
                </Button>
              </ScrollView>
            </View>
        }

      </View>
    </React.Fragment>
  )
}