import { View, Text, ScrollView, Image } from "react-native"
import React, { useEffect, useState } from "react"

import styles from "./styles"

import * as ApiFutebolService from "../../../services/apiFutebolService"

import Header from '../../../components/header'

import {
    Button,
    ActivityIndicator,
    Colors,
    DataTable
} from "react-native-paper";


export default function Home({ navigation }) {

    const [apostas, setApostas] = useState()
    const [loading, setLoading] = useState(false)
   
    useEffect(() => {
        const getData = async () => {
            await getTabelaApostas();
        }
        getData();
    }, []);


    const getTabelaApostas = async () => {
        await ApiFutebolService.getApostas().then((result) => {
            setApostas(result.data().apostas)
        })
    }


    return (
        <>
            <Header navigation={navigation} labels={title = "Tabela de apostas"} />
            <View style={styles.mainContainer}>
                <View style={styles.secondContainer}>
                    <Image
                        source={require('../../../repositories/images/tabela_apostas.png')}
                        style={styles.imageAposta}
                    />
                </View>
                <View style={styles.thirdContainer}>
                    {
                        loading ?
                            <View>
                                <ActivityIndicator
                                    style={{ marginBottom: 300 }}
                                    animating={true}
                                    color={Colors.green500}
                                    size="large"
                                />
                            </View>
                            :
                            <View>

                                {
                                    typeof apostas === 'undefined' ?
                                        null
                                        :
                                        <>
                                            <View>
                                                <DataTable style={{ width: 350 }}>
                                                    <DataTable.Header>
                                                        <DataTable.Title style={styles.tableStyle}>
                                                            <Text style={styles.headerTableText}>Avatar</Text>
                                                        </DataTable.Title>
                                                        <DataTable.Title style={styles.tableStyle}>
                                                            <Text style={styles.headerTableText}>Colocação</Text>
                                                        </DataTable.Title>
                                                        <DataTable.Title style={styles.tableStyleEnd}>
                                                            <Text style={styles.headerTableTextEnd}>Nome</Text>
                                                        </DataTable.Title>
                                                        <DataTable.Title style={styles.tableStyleEnd}>
                                                            <Text style={styles.headerTableTextEnd}>Pontos</Text>
                                                        </DataTable.Title>
                                                    </DataTable.Header>
                                                </DataTable>
                                            </View>
                                            <ScrollView>
                                                {
                                                    apostas.map((item, key) => {
                                                        return (
                                                            <View style={{
                                                                flexDirection: "row",
                                                                alignItems: "center",
                                                                justifyContent: "flex-start",
                                                                marginTop: 5
                                                            }} key={key}>
                                                                <View style={{
                                                                    flexDirection: "row",
                                                                    alignItems: "center"
                                                                }} >
                                                                    <Image source={{ uri: item.url }} style={styles.image} />
                                                                    <Text style={{ marginLeft: 45 }}>{`${key += 1}°`}</Text>
                                                                </View>

                                                                <View style={{
                                                                    flexDirection: "row",
                                                                    marginRight: 20,
                                                                    marginLeft: 30,
                                                                    alignItems: "center"
                                                                }}>
                                                                    <View style={{ marginRight: 27, width: 130 }}>
                                                                        <Text style={{ maxWidth: 130 }}
                                                                            onPress={() => {
                                                                                navigation.navigate("aposta", {
                                                                                    email: item.email,
                                                                                    nome: item.nome,
                                                                                    label: "Espiadinha nas apostas de...",
                                                                                    origem: "home"
                                                                                })
                                                                            }}
                                                                        >{item.nome}
                                                                        </Text>
                                                                    </View>
                                                                    <View>
                                                                        <Text style={{fontSize:15}}>{item.pontos}</Text>
                                                                    </View>
                                                                </View>
                                                            </View>
                                                        )
                                                    })}
                                            </ScrollView>
                                        </>
                                }

                            </View>
                    }
                </View>
                <View style={styles.forthContainer}>
                    <Button
                        style={styles.backButton}
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
