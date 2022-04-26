import React from "react";
import { LogBox } from 'react-native'

import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Provider as StoreProvider } from "react-redux";
import store from "../app/src/store/store";

import Login from "../app/src/views/autenticacao/login";
import Home from "../app/src/views/tabelas/apostas/tabela";
import Cadastro from "../app/src/views/tabelas/apostas/cadastro";
import Registro from "../app/src/views/autenticacao/registro";
import Redefinir_senha from "../app/src/views/autenticacao/redefinir_senha";
import Perfil from "../app/src/views/perfil/perfil";
import Aposta from "../app/src/views/perfil/aposta";
import Brasileirao from "../app/src/views/tabelas/brasileirao/tabela";
import Regras from "../app/src/views/tabelas/regras/tabela";


const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#02a859",
    accent: "#02a859",
  },
};

LogBox.ignoreLogs(['Setting a timer',
  'Possible Unhandled Promisse',
  'Non-serializable values were found in the navigation state',
  'AsyncStorage has been extracted from react-native core and will be removed in a future release.',
  '[Unhandled promise rejection:',
  `The action 'NAVIGATE' with payload { "name": "" } was not handled by any navigator.`])

const Stack = createStackNavigator();

export default function App() {
  return (
    <StoreProvider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="login"
            screenOptions={{ headerShown: false }}
          >            
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="registro" component={Registro} />
            <Stack.Screen name="home" component={Home} />
            <Stack.Screen name="cadastro" component={Cadastro} />
            <Stack.Screen name="redefinir" component={Redefinir_senha} />
            <Stack.Screen name="perfil" component={Perfil} />  
            <Stack.Screen name="aposta" component={Aposta} />  
            <Stack.Screen name="brasileirao" component={Brasileirao} />
            <Stack.Screen name="regras" component={Regras} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </StoreProvider>
  );
}