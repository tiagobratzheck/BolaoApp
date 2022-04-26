import { View, ScrollView, Text, BackHandler, Image } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import { useFocusEffect } from "@react-navigation/native";

import Header from '../../components/header'

import styles from "./styles"

import * as UserService from '../../services/userServices'

import {
    Button,
    ActivityIndicator,
    Colors,
    DataTable
} from "react-native-paper";


export default function Aposta({ route, navigation }) {

    const { email, nome, label, origem } = route.params
    const [loading, setLoading] = useState(false)
    const [userBet, setUserBet] = useState()

    useEffect(() => {
        setLoading(true)
        getBetUser()
    }, [])

    useFocusEffect(
        useCallback(() => {
            const backAction = () => {
                navigation.goBack()
                return true;
            };
            const backHandler = BackHandler.addEventListener(
                "hardwareBackPress",
                backAction
            );
            return () => backHandler.remove();
        }, [])
    )

    const getBetUser = async () => {
        const userBet = await UserService.getUserBet(email).then((result) => {
            if (result.data() !== undefined) {
                setUserBet(result.data().aposta)
                setLoading(false)
            }
        }).catch((err) => {
            console.log(err.message)
        })
    }

    return (
        <>
            <Header navigation={navigation} labels={title = "Ver aposta"} />
            <View style={styles.containerAposta}>
                <View style={styles.firstViewAposta}>
                    <Image
                        source={require('../../repositories/images/apostas.png')}
                        style={styles.imageAposta}
                    />
                    <Text style={styles.title}>{label}</Text>
                    <Text style={styles.title}>{nome}</Text>
                </View>
                {
                    loading ?
                        <View>
                            <ActivityIndicator
                                style={{ marginBottom: 250 }}
                                animating={true}
                                color={Colors.green500}
                                size="large"
                            />
                        </View>
                        :
                        <View style={styles.secondViewAposta}>

                            {typeof userBet === 'undefined' ?
                                null
                                :
                                <>
                                    <DataTable style={{ width: 350 }}>
                                        <DataTable.Header>
                                            <DataTable.Title style={styles.tableStyle}>
                                                <Text style={styles.headerTableText}>Colocação</Text>
                                            </DataTable.Title>
                                            <DataTable.Title style={[styles.tableStyle, { marginLeft: 70 }]}>
                                                <Text style={styles.headerTableText}>Time</Text>
                                            </DataTable.Title>
                                        </DataTable.Header>
                                        <ScrollView>
                                            <DataTable.Row>
                                                <DataTable.Cell style={styles.tableStyle}>
                                                    <Text style={{ color: '#0A09F0' }}>CAMPEÃO</Text>
                                                </DataTable.Cell>
                                                <DataTable.Cell style={styles.tableStyle}>
                                                    <Text style={styles.tableText}>{userBet['1°']}</Text>
                                                </DataTable.Cell>
                                            </DataTable.Row>
                                            <DataTable.Row>
                                                <DataTable.Cell style={styles.tableStyle}>2° lugar</DataTable.Cell>
                                                <DataTable.Cell style={styles.tableStyle}>
                                                    <Text style={styles.tableText}>{userBet['2°']}</Text>
                                                </DataTable.Cell>
                                            </DataTable.Row>
                                            <DataTable.Row>
                                                <DataTable.Cell style={styles.tableStyle}>3° lugar</DataTable.Cell>
                                                <DataTable.Cell style={styles.tableStyle}>
                                                    <Text style={styles.tableText}>{userBet['3°']}</Text>
                                                </DataTable.Cell>
                                            </DataTable.Row>
                                            <DataTable.Row>
                                                <DataTable.Cell style={styles.tableStyle}>4° lugar</DataTable.Cell>
                                                <DataTable.Cell style={styles.tableStyle}>
                                                    <Text style={styles.tableText}>{userBet['4°']}</Text>
                                                </DataTable.Cell>
                                            </DataTable.Row>
                                            <DataTable.Row>
                                                <DataTable.Cell style={styles.tableStyle}>5° lugar</DataTable.Cell>
                                                <DataTable.Cell style={styles.tableStyle}>
                                                    <Text style={styles.tableText}>{userBet['5°']}</Text>
                                                </DataTable.Cell>
                                            </DataTable.Row>
                                            <DataTable.Row>
                                                <DataTable.Cell style={styles.tableStyle}>6° lugar</DataTable.Cell>
                                                <DataTable.Cell style={styles.tableStyle}>
                                                    <Text style={styles.tableText}>{userBet['6°']}</Text>
                                                </DataTable.Cell>
                                            </DataTable.Row>
                                            <DataTable.Row>
                                                <DataTable.Cell style={styles.tableStyle}>17° lugar</DataTable.Cell>
                                                <DataTable.Cell style={styles.tableStyle}>
                                                    <Text style={styles.tableText}>{userBet['17°']}</Text>
                                                </DataTable.Cell>
                                            </DataTable.Row>
                                            <DataTable.Row>
                                                <DataTable.Cell style={styles.tableStyle}>18° lugar</DataTable.Cell>
                                                <DataTable.Cell style={styles.tableStyle}>
                                                    <Text style={styles.tableText}>{userBet['18°']}</Text>
                                                </DataTable.Cell>
                                            </DataTable.Row>
                                            <DataTable.Row>
                                                <DataTable.Cell style={styles.tableStyle}>19° lugar</DataTable.Cell>
                                                <DataTable.Cell style={styles.tableStyle}>
                                                    <Text style={styles.tableText}>{userBet['19°']}</Text>
                                                </DataTable.Cell>
                                            </DataTable.Row>
                                            <DataTable.Row>
                                                <DataTable.Cell style={styles.tableStyle}>
                                                    <Text style={{ color: '#FE0000' }}>Lanterna</Text>
                                                </DataTable.Cell>
                                                <DataTable.Cell style={styles.tableStyle}>
                                                    <Text style={styles.tableText}>{userBet['20°']}</Text>
                                                </DataTable.Cell>
                                            </DataTable.Row>
                                        </ScrollView>
                                    </DataTable>
                                </>
                            }
                        </View>
                }
                <View style={styles.thirdViewAposta}>
                    <Button
                        style={styles.button}
                        mode='contained'
                        onPress={() => { navigation.goBack() }}
                    >Voltar
                    </Button>
                </View>

            </View>
        </>
    )
}