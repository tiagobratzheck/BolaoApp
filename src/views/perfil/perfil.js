import { View, Text, TouchableHighlight, Image, BackHandler, Alert } from "react-native";
import React, { useState, useLayoutEffect, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useSelector } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';

import { useDispatch } from "react-redux";
import * as userAction from "../../store/action";

import * as UserService from '../../services/userServices'
import * as ApiFutebolService from '../../services/apiFutebolService'
import * as Regras from '../../services/regras'

import Header from '../../components/header'
import styles from "./styles";

import {
  TextInput,
  Button,
  ActivityIndicator,
  Colors
} from "react-native-paper";


export default function Perfil({ route, navigation }) {

  // Dados do usuário da store
  const user = useSelector((user) => user);

  // Objeto do usuário
  const [userData, setUserData] = useState({
    email: "",
    nome: "",
    fez_aposta: undefined,
    perfil: "",
    tempo_ti: {
      meses: undefined,
      anos: undefined,
    },
    urlImage: "",
  });

  // Objetos referente ao tempo de T.I.
  const [userTempoTi, setUserTempoTi] = useState({
    anos: userData.tempo_ti.anos,
    meses: userData.tempo_ti.meses
  })

  // Tabela do brasileirão
  const [tabela, setTabela] = useState([])

  // Tabelas das apostas
  const [apostas, setApostas] = useState([])

  // Variáveis auxiliáres
  const [msg, setMsg] = useState("")
  const [photoMsg, setPhotoMsg] = useState("")
  const [updateMsg, setUpdateMsg] = useState("")
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [loadingUpdateTable, setLoadingUpdateTable] = useState(false)
  const [tabelaAtualizada, setTabelaAtualizada] = useState(false)
  const [finalUpdate, setFinalUpdate] = useState(false)

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    setLoading(true)
    getUser()
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getUser()
    });
    return unsubscribe;
  }, [navigation, userData]);

  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        Alert.alert("Alerta!", "Deseja mesmo sair do aplicativo?", [
          {
            text: "Não",
            onPress: () => null,
            style: "cancel"
          },
          {
            text: "Sim", onPress: () => {
              navigation.goBack();
              //BackHandler.exitApp();
            }
          }
        ]);
        return true;
      };
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
      return () => backHandler.remove();
    }, [])
  )


  const getUser = async () => {
    await UserService.getUser(route.params.propsEmail).then((result) => {
      if (result.data() !== undefined) {
        setUserData({
          email: result.data().email,
          nome: result.data().nome,
          fez_aposta: result.data().fez_aposta,
          perfil: result.data().perfil,
          tempo_ti: {
            meses: result.data().tempo_ti.meses,
            anos: result.data().tempo_ti.anos
          },
          urlImage: result.data().urlImage
        })
        if (result.data().urlImage !== undefined) {
          UserService.getImageProfileUser(result.data().urlImage).then((url) => {
            if (url !== undefined) {
              setLoading(false)
              setImage(url)
            }
          }).catch((err) => {
            console.log(err.message)
          })
        }
      }
    }).catch((err) => {
      console.log(err.message)
    })
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const updateUserState = async () => {
    setLoading(true)
    const userUpdated = {
      email: userData.email,
      nome: userData.nome,
      fez_aposta: userData.fez_aposta,
      perfil: userData.perfil,
      tempo_ti: {
        meses: typeof userTempoTi.meses === 'undefined' ? '0' : userTempoTi.meses,
        anos: typeof userTempoTi.anos === 'undefined' ? '0' : userTempoTi.anos,
      },
      urlImage: userData.email,
    }
    return userUpdated
  }

  const updateUserProfile = async () => {
    const updateState = await updateUserState()
    await UserService.updateUser(user.email, updateState).then(() => {
      UserService.saveImageProfileUser(user.email, image).then(() => {
        setLoading(false);
        getUser()
        dispatch(userAction.getUser(user.email));
      }).catch((err) => {
        setMsg(err.message)
      })
    }).catch((err) => {
      setMsg(err.message)
    })
  }

  const updateImageProfile = async () => {
    setLoadingUpdateTable(true)
    if (typeof image !== 'object') {
      await UserService.saveImageProfileUser(user.email, image).then(() => {
        setLoadingUpdateTable(false)
        setPhotoMsg("Foto atualizada com sucesso!");
      }).catch((err) => {
        setMsg(err.message)
      })
    }
  }

  const updateTabelaBrasileirao = async () => {
    setLoadingUpdateTable(true)
    setUpdateMsg("Pegando dados da API")
    await ApiFutebolService.updateTabela().then((result) => {
      const data = {
        tabela: result.data
      }
      ApiFutebolService.saveTabela(data).then(() => {
        ApiFutebolService.getTabela().then((result) => {
          result.data().tabela.forEach(element => {
            setTabela(prevArray => [...prevArray, element.time.nome_popular])
          })
        })
        setLoadingUpdateTable(false)
        setTabelaAtualizada(true)
        setUpdateMsg("Tabela do brasileirão atualizada!")
      }).catch((err) => {
        console.log(err)
      })
    }).catch((err) => {
      console.log(err)
    })
  }

  const coletarApostas = async () => {
    setLoadingUpdateTable(true)
    setUpdateMsg("Coletando as apostas...")
    await UserService.getAllBets().then((result) => {
      result.docs.forEach(element => {
        const pontos = Regras.calcularTabelaApostas(element.data().aposta, tabela)
        UserService.getImageProfileUser(element.id).then((url) => {
          if (url !== undefined) {
            setApostas(prevState => (
              [...prevState, {
                url,
                email: element.id,
                nome: element.data().nome,
                tempo_ti: {
                  anos: element.data().tempo_anos,
                  meses: element.data().tempo_meses
                },
                pontos
              }]))
          }
        })
      })
      setUpdateMsg("Apostas coletadas!")
      setLoadingUpdateTable(false)
    }).catch((err) => {
      console.log(err.message)
    })
  }

  const compare = (a, b) => {
    if (a.pontos < b.pontos) {
      return 1;
    }
    if (a.pontos > b.pontos) {
      return -1;
    }
    return 0;
  }

  const verificarEmpate = async (primeiro, segundo) => {
    if (primeiro.pontos === segundo.pontos) {
      let copy_apostas = [...apostas]
      if (primeiro.tempo_ti.anos === segundo.tempo_ti.anos) {
        if (primeiro.tempo_ti.meses > segundo.tempo_ti.meses) {
          copy_apostas[0].pontos = copy_apostas[0].pontos + 1
        }
        else if (segundo.tempo_ti.meses > primeiro.tempo_ti.meses) {
          copy_apostas[1].pontos = copy_apostas[1].pontos + 1
        }
      }
      else if (primeiro.tempo_ti.anos > segundo.tempo_ti.anos) {
        copy_apostas[0].pontos = copy_apostas[0].pontos + 1
      }
      else if (segundo.tempo_ti.anos > primeiro.tempo_ti.anos) {
        copy_apostas[1].pontos = copy_apostas[1].pontos + 1
      }
      setApostas(copy_apostas)
    }
  }

  const updateTabelaApostas = async () => {
    setLoadingUpdateTable(true)
    setUpdateMsg("atualizando...")
    if (apostas.length > 2) {
      apostas.sort(compare)
      await verificarEmpate(apostas[0], apostas[1])
      apostas.sort(compare)
    }
    const dadosApostas = {
      apostas
    }
    await ApiFutebolService.saveBetTable(dadosApostas).then(() => {
      setUpdateMsg("Tabela das apostas atualizada!")
      setLoadingUpdateTable(false)
      setFinalUpdate(true)
    }).catch((err) => {
      console.log(err.message)
    })
  }

  return (
    <>
      <Header navigation={navigation} labels={title = "Perfil do usuário"} />
      <View style={styles.container}>
        {
          loading ?
            <View>
              <ActivityIndicator
                style={{ marginTop: 300 }}
                animating={true}
                color={Colors.green500}
                size="large"
              />
            </View>
            :
            <React.Fragment>
              <Text style={styles.title}>Perfil do apostador</Text>
              <View style={styles.containerImage}>
                <TouchableHighlight style={{ borderRadius: 100 }} onPress={() => pickImage()}>
                  {
                    image ?
                      <Image source={{ uri: image }}
                        style={styles.image} />
                      :
                      <Image source={require('../../repositories/images/avatar.png')}
                        style={styles.image} />
                  }
                </TouchableHighlight>
              </View>
              <View style={styles.textUserInfo}>
                <Text>Nome do apostador: </Text>
                <Text style={{ fontSize: 19 }}>{user.nome}</Text>
              </View>
              <View style={styles.textUserInfo}>
                <Text>Email: </Text>
                <Text style={{ fontSize: 17 }}>{user.email}</Text>
              </View>
              {userData && userData.fez_aposta === true ? (
                <View>
                  <View style={styles.containerText}>
                    <Text>
                      {`Tempo de TI: ${typeof userData.tempo_ti.anos === 'undefined' ? 0 : userData.tempo_ti.anos} anos e ${typeof userData.tempo_ti.meses === 'undefined' ? 0 : userData.tempo_ti.meses} meses.`}
                    </Text>
                  </View>
                  <Button
                    style={styles.button}
                    mode='outlined'
                    onPress={() => { updateImageProfile() }}
                  >Atualizar foto
                  </Button>
                  <Button
                    style={styles.button}
                    mode='contained'
                    onPress={() => {
                      navigation.navigate("aposta", {
                        email: userData.email,
                        nome: '',
                        label: "Minhas apostas",
                        origem: "perfil"
                      })
                    }}
                  >Ver as apostas
                  </Button>
                  <View style={styles.containerButtons}>
                    <View style={styles.rowButtons}>
                      <TouchableHighlight
                        activeOpacity={0.8}
                        underlayColor="#FFFFFF"
                        onPress={() => { navigation.navigate("home") }}>
                        <Image source={require('../../repositories/images/tabela_apostas.png')}
                          style={styles.iconTouchable} />
                      </TouchableHighlight>
                      <Text style={styles.textIcons}>Tabela das</Text>
                      <Text style={styles.textIcons}>apostas</Text>
                    </View>
                    <View style={styles.rowButtons}>
                      <TouchableHighlight
                        activeOpacity={0.8}
                        underlayColor="#FFFFFF"
                        onPress={() => { navigation.navigate("brasileirao") }}>
                        <Image source={require('../../repositories/images/tabela_brasileiro.png')}
                          style={styles.iconTouchable} />
                      </TouchableHighlight>
                      <Text style={styles.textIcons}>Tabela do</Text>
                      <Text style={styles.textIcons}>brasileirão</Text>
                    </View>
                    <View style={styles.rowButtons}>
                      <TouchableHighlight
                        activeOpacity={0.8}
                        underlayColor="#FFFFFF"
                        onPress={() => { navigation.navigate("regras") }}>
                        <Image source={require('../../repositories/images/regulamento.png')}
                          style={styles.iconTouchable} />
                      </TouchableHighlight>
                      <Text style={styles.textIcons}>Lista do</Text>
                      <Text style={styles.textIcons}>regulamento</Text>
                    </View>
                    {
                      userData.perfil === 'DEV' &&
                      <>
                        {
                          tabelaAtualizada === false ?
                            <View style={styles.rowButtons}>
                              <TouchableHighlight
                                activeOpacity={0.8}
                                underlayColor="#FFFFFF"
                                onPress={() => { updateTabelaBrasileirao() }}>
                                <Image source={require('../../repositories/images/atualizar_tabela.png')}
                                  style={styles.iconTouchable} />
                              </TouchableHighlight>
                              <Text style={styles.textIcons}>Atualizar tabela</Text>
                              <Text style={styles.textIcons}>do brasileirão</Text>
                            </View>
                            :
                            <>
                              {
                                apostas.length === 0 ?
                                  <View style={styles.rowButtons}>
                                    <TouchableHighlight
                                      activeOpacity={0.8}
                                      underlayColor="#FFFFFF"
                                      onPress={() => { coletarApostas() }}>
                                      <Image source={require('../../repositories/images/atualizar_apostas.png')}
                                        style={styles.iconTouchable} />
                                    </TouchableHighlight>
                                    <Text style={styles.textIcons}>Coletar dados</Text>
                                    <Text style={styles.textIcons}>das apostas</Text>
                                  </View>
                                  :
                                  <View style={styles.rowButtons}>
                                    <TouchableHighlight
                                      activeOpacity={0.8}
                                      underlayColor="#FFFFFF"
                                      onPress={() => {
                                        finalUpdate === false ? updateTabelaApostas()
                                          : {}
                                      }}>
                                      <Image source={require('../../repositories/images/atualizar_tabela_apostas.png')}
                                        style={styles.iconTouchable} />
                                    </TouchableHighlight>
                                    <Text style={styles.textIcons}>Atualizar tabela</Text>
                                    <Text style={styles.textIcons}>das apostas</Text>
                                  </View>
                              }
                            </>
                        }
                      </>
                    }
                  </View>
                  <View style={{ alignItems: "center" }}>
                    {
                      loadingUpdateTable &&
                      <ActivityIndicator
                        style={{ marginTop: 10 }}
                        animating={true}
                        color={Colors.green500}
                        size="large"
                      />
                    }
                    <Text style={{ marginTop: 20 }}>{updateMsg}</Text>
                    <Text style={{ marginTop: 20 }}>{photoMsg}</Text>
                  </View>
                </View>
              ) : (
                <View>
                  <View>
                    <View style={styles.containerUserInfo}>
                      {
                        msg ?
                          <View>
                            <Text>{msg}</Text>
                          </View>
                          :
                          <View style={{ alignItems: "center" }}>
                            <Text>Seleção dos anos de T.I.</Text>
                            <View style={styles.containerInputs}>
                              {
                                typeof userData.tempo_ti.anos !== 'object' ?
                                  <>
                                    <TextInput
                                      style={styles.inputs}
                                      disabled
                                      label="Anos"
                                      keyboardType="number-pad"
                                      value={
                                        userData && `${typeof userData.tempo_ti.anos === 'undefined' ? 0 : userData.tempo_ti.anos}`
                                      }
                                      mode="outlined"
                                      onChangeText={(value) => { }}
                                    />
                                    <TextInput
                                      style={styles.inputs}
                                      disabled
                                      label="Meses"
                                      keyboardType="number-pad"
                                      value={
                                        userData && `${typeof userData.tempo_ti.meses === 'undefined' ? 0 : userData.tempo_ti.meses}`
                                      }
                                      mode="outlined"
                                      onChangeText={(value) => { }}
                                    />
                                  </>
                                  :
                                  <>
                                    <TextInput
                                      style={styles.inputs}
                                      label="Anos"
                                      keyboardType="number-pad"
                                      value={`${typeof userTempoTi.anos === 'undefined' ? 0 : userTempoTi.anos}`}
                                      mode="outlined"
                                      onChangeText={(value) => setUserTempoTi(oldState => ({ ...oldState, anos: value }))}
                                    />
                                    <TextInput
                                      style={styles.inputs}
                                      label="Meses"
                                      keyboardType="number-pad"
                                      value={`${typeof userTempoTi.meses === 'undefined' ? 0 : userTempoTi.meses}`}
                                      mode="outlined"
                                      onChangeText={(value) => setUserTempoTi(oldState => ({ ...oldState, meses: value }))}
                                    />
                                  </>
                              }
                            </View>
                            {
                              typeof userData.tempo_ti.meses !== 'object' && userData.fez_aposta === false ?
                                <React.Fragment>
                                  <Button
                                    style={styles.button}
                                    disabled
                                    mode='contained'
                                    onPress={() => { }}
                                  >Cadastrar
                                  </Button>
                                  <Button
                                    style={styles.button}
                                    mode='outlined'
                                    onPress={() => { navigation.navigate("cadastro") }}
                                  >Fazer aposta
                                  </Button>
                                </React.Fragment>
                                :
                                <>
                                  {
                                    typeof image === 'object' ?
                                      <Button
                                        style={styles.button}
                                        disabled
                                        mode='contained'
                                        onPress={() => { }}
                                      >Cadastrar
                                      </Button>
                                      :
                                      <Button
                                        style={styles.button}
                                        mode='contained'
                                        onPress={() => { updateUserProfile() }}
                                      >Cadastrar
                                      </Button>
                                  }
                                </>
                            }
                          </View>
                      }
                    </View>
                  </View>
                </View>
              )}
            </React.Fragment>
        }
      </View>
    </>
  );
}
