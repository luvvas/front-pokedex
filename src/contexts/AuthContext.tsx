import { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextValue = {
  isUserAuthenticated: boolean
  setIsUserAuthenticated: any
  getToken: (navigation: any) => Promise<void>
  storeToken: (navigation: any, value: string) => Promise<void>
  removeToken: (navigation: any) => Promise<void>
}

export const AuthContext = createContext(null as AuthContextValue);

export function AuthProvider({ children }) {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false)

  async function getToken(navigation) {
    try {
      const token = await AsyncStorage.getItem('@storage_token');
      setIsUserAuthenticated(!!token);
      if (token) {
        navigation.navigate('Menu');
      }
    } catch(e) {
      console.log(e)
    }
  }

  async function storeToken(navigation, token) {
    try {
      await AsyncStorage.setItem('@storage_token', token);
      setIsUserAuthenticated(true)
      navigation.navigate('Menu')
    } catch(e) {
      console.log(e)
    }
  }

  async function removeToken(navigation) {
    try {
      await AsyncStorage.removeItem('@storage_token');
      setIsUserAuthenticated(false)
      navigation.navigate('Auth')
    } catch(e) {
      console.log(e)
    }
  }

  return (
    <AuthContext.Provider
      value={{ isUserAuthenticated, setIsUserAuthenticated, getToken, storeToken, removeToken }}
    >
      {children}
    </AuthContext.Provider>
  )
}