import { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextValue = {
  isUserAuthenticated: boolean
  username: string
  avatar: string
  setIsUserAuthenticated: any
  storeUser: (user:string) => Promise<void>
  getUser: () => Promise<void>
  storeAvatar: (avatar:string) => Promise<void>
  getAvatar: () => Promise<void>
  getToken: (navigation: any) => Promise<void>
  storeToken: (navigation: any, value: string) => Promise<void>
  removeToken: (navigation: any) => Promise<void>
}

export const AuthContext = createContext(null as AuthContextValue);

export function AuthProvider({ children }) {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false)
  const [username, setUsername] = useState('')
  const [avatar, setAvatar] = useState('')

  async function storeUser(user) {
    try {
      await AsyncStorage.setItem('@storage_user', user)
    } catch(e) {
      console.log(e)
    }
  }

  async function storeAvatar(avatar) {
    try {
      await AsyncStorage.setItem('@storage_avatar', avatar)
    } catch(e) {
      console.log(e)
    }
  }

  async function getUser() {
    try {
      const username = await AsyncStorage.getItem('@storage_user')
      setUsername(username)
    } catch(e) {
      console.log(e)
    }
  }

  async function getAvatar() {
    try {
      const avatar = await AsyncStorage.getItem('@storage_avatar')
      setAvatar(avatar)
    } catch (e) {
      console.log(e)
    }
  }

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
      value={{ isUserAuthenticated, username, avatar, setIsUserAuthenticated, storeUser, getUser, getAvatar, storeAvatar, getToken, storeToken, removeToken }}
    >
      {children}
    </AuthContext.Provider>
  )
}