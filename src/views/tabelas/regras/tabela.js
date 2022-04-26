import { View, Text, Image, ScrollView } from 'react-native'
import React from 'react'

import Header from '../../../components/header'

import styles from './styles'

import {
    Button,
    ActivityIndicator,
    Colors,
    DataTable
} from "react-native-paper";

export default function Regras({ navigation }) {
    return (
        <>
            <Header navigation={navigation} labels={title = "Regulamento"} />
            <View style={styles.container}>
                <View style={styles.secondContainer}>
                    <Image
                        source={require('../../../repositories/images/regulamento.png')}
                        style={styles.image}
                    />
                </View>
                <View style={styles.thirdContainer}>
                    <ScrollView>
                        <View>
                            <View style={styles.textBox}>
                                <Text style={styles.text}>
                                    1) As regras de pontuação estão descritas conforme tabela abaixo.
                                    Você poderá pontuar acertando a classificação exata ou acertando o
                                    time entre os 6 primeiro e/ou 4 últimos do campeonato. Ao final do campeonato,
                                    os integrantes do bolão irão para um churrasco no Chico Churrascaria,
                                    onde o primeiro colocado do bolão não pagará a janta nem o transporte
                                    (a ser pago pelos demais participantes com o valor da inscrição).
                                    Os critérios de desempate estão descritos abaixo.
                                </Text>
                            </View>
                            <View style={styles.textBox}>
                                <Text style={styles.text}>
                                    2) A participação está condicionada ao pagamento da taxa de inscrição de R$ 15,00
                                    a ser quitada até sexta (08/04/2022) às 12:00h, data limite também para envio das apostas.
                                    O valor arrecadado será abatido do valor do transporte para janta e custo do app;
                                </Text>
                            </View>
                            <View style={styles.textBox}>
                                <Text style={styles.text}>
                                    3) Caso, por motivos de força maior (COVID, Furacão, Tsunami, Terremoto, etc)
                                    a janta não puder ser realizada até o início da próxima temporada (2022),
                                    o valor arrecadado será destinado ao Campeão do Bolão como forma de premiação;
                                </Text>
                            </View>
                            <View style={styles.textBox}>
                                <Text style={styles.text}>
                                    4) Caso o Campeão do bolão não esteja mais trabalhando na Stara ao final do campeonato,
                                    o mesmo poderá optar em receber o valor arrecadado das taxas de inscrição como premiação.
                                    Neste caso, o valor arrecadado não será utilizado para abater o valor do transporte
                                    e nenhum dos participantes ganhará a janta de graça no Chico Churrascaria.
                                </Text>
                            </View>
                            <View style={styles.textBox}>
                                <Text style={styles.text}>
                                    5) Caso aconteça do apostador ter o time que ele apontou como campeão rebaixado,
                                    este terá 20 pontos reduzidos.
                                </Text>
                            </View>
                            <View style={styles.textBox}>
                                <Text style={styles.text}>6) Toda inscrição no bolão deve ser de colegas da TI ou externo com indicação interna
                                    e aprovação do comitê e presidência.
                                </Text>
                            </View>
                            <View style={styles.textBox}>
                                <Text style={styles.text}>7) As inscrições são feitas somente com o comitê de presidência.
                                </Text>
                            </View>
                            <View style={styles.textBox}>
                                <Text style={styles.text}>8) O Comitê é formado pelos 3 últimos presidentes do bolão e gestor de logística.
                                </Text>
                            </View>
                            <View style={styles.textBox}>
                                <Text style={styles.text}>
                                    9) O presidente do ano seguinte sempre será eleito em eleições democráticas
                                    no dia da janta, ele pode se candidatar ou a maioria pode definir democraticamente
                                    que ele será o presidente. (Caso tenhamos mais de um candidato será feita uma
                                    votação sem identificação pelo Google forms).
                                </Text>
                            </View>
                            <View style={styles.textBox}>
                                <Image
                                    source={require('../../../repositories/images/tabela_regulamento.png')}
                                    style={{width: 350, height: 180}}
                                />
                            </View>
                            <View style={[styles.textBox,{alignItems:"center"}]}>
                                <Image
                                    source={require('../../../repositories/images/criterios.png')}
                                    style={{ width: 200, height: 300 }}
                                />
                            </View>
                        </View>
                    </ScrollView>
                </View>
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