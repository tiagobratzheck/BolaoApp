import { View, Text, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'

import Header from '../../../components/header'

import * as ApiFutebolService from '../../../services/apiFutebolService'

import styles from "./styles"

import {
  Button,
  ActivityIndicator,
  Colors,
  DataTable
} from "react-native-paper";


export default function Brasileirao({ navigation }) {

  const [loading, setLoading] = useState(false)
  const [tabela, setTabela] = useState([])

  useEffect(() => {
    getTabelaBrasileirao();
  }, [])

  const getTabelaBrasileirao = async () => {
    setLoading(true)
    await ApiFutebolService.getTabela().then((result) => {
      setTabela(result.data().tabela)
      setLoading(false)
    }).catch(() => {

    })
  }

  return (
    <>
      <Header navigation={navigation} labels={title = "Brasileirão"} />
      <View style={styles.mainContainer}>
        <View style={styles.secondContainer}>
          <Image
            source={require('../../../repositories/images/brasileirao.png')}
            style={styles.image}
          />
        </View>
        {
          loading ?
            <View>
              <ActivityIndicator
                style={{ marginBottom: 400 }}
                animating={true}
                color={Colors.green500}
                size="large"
              />
            </View>
            :
            <View style={styles.thirdContainer}>
              <DataTable style={{ width: 350 }}>
                {tabela.length === 0 ?
                  null
                  :
                  <>
                    <DataTable.Header>
                      <DataTable.Title style={styles.tableStyle}>
                        <Text style={styles.headerTableText}>Colocação</Text>
                      </DataTable.Title>
                      <DataTable.Title style={[styles.tableStyle, { marginLeft: 30 }]}>
                        <Text style={styles.headerTableText}>Time</Text>
                      </DataTable.Title>
                      <DataTable.Title style={styles.tableStyle}>
                        <Text style={styles.headerTableText}>Pontos</Text>
                      </DataTable.Title>
                    </DataTable.Header>
                    <ScrollView>
                      {
                        tabela.map((item, key) => {
                          return (
                            <DataTable.Row key={key}>
                              <DataTable.Cell style={styles.tableStyle}>
                                <Text style={styles.tableText}>{`${item.posicao}°`}</Text>
                              </DataTable.Cell>
                              <DataTable.Cell style={styles.tableStyle}>
                                <Text style={styles.tableText}>{item.time.nome_popular}</Text>
                              </DataTable.Cell>
                              <DataTable.Cell style={styles.tableStyleEnd}>
                                <Text style={styles.tableText}>{item.pontos}</Text>
                              </DataTable.Cell>
                            </DataTable.Row>
                          );
                        })
                      }
                    </ScrollView>
                  </>
                }
              </DataTable>
            </View>
        }
        <View style={styles.forthContainer}>
          <Button
            style={styles.button}
            mode='contained'
            onPress={() => {
              navigation.goBack()
            }}
          >Voltar
          </Button>
        </View>
      </View>
    </>
  )
}