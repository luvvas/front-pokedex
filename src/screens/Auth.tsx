import React, { useContext, useEffect } from "react";
import { TouchableOpacity, View, Text, Image } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';

import { AntDesign } from '@expo/vector-icons'; 

import axios from "axios";

import { AuthContext } from '../contexts/AuthContext'

export function Auth ({ navigation }) {
  const { storeUser, getToken, storeAvatar, storeToken } = useContext(AuthContext)

  const discovery = {
    authorizationEndpoint: 'https://github.com/login/oauth/authorize',
    tokenEndpoint: 'https://github.com/login/oauth/access_token',
    revocationEndpoint: 'https://github.com/settings/connections/applications/6f361610ced9acd91b78',
  };

  const [, response, signInWithGithub] = useAuthRequest(
    {
      clientId: '6f361610ced9acd91b78',
      scopes: ['identity'],
      redirectUri: makeRedirectUri({
        scheme: 'pokedex'
      }),
    },
    discovery
  );

  async function getAuthentication(code) {
    const accessTokenResponse = await axios.post('https://github.com/login/oauth/access_token',
    null,
    {
      params: {
        client_id: '6f361610ced9acd91b78',
        client_secret: 'bad997eca2d5a284262d5469d0da4cc20172cdef',
        code,
      },
      headers: {
        'Accept': 'application/json',
      }
    })

    const { access_token } = accessTokenResponse.data
    storeToken(navigation, access_token)
    
    const userResponse = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    })

    const { name, avatar_url } = userResponse.data

    storeUser(name)
    storeAvatar(avatar_url)
  }

  useEffect(() => {
    getToken(navigation)
  }, [])

  useEffect(() => {
    if(response?.type === 'success') {
      const { code } = response.params

      getAuthentication(code);
    }
  }, [response])


  return (
    <View className="h-screen justify-center space-y-8 p-8 justify-between">
      <StatusBar style="dark" translucent />
      <View className="pt-52">
        <Text style={{ textAlign: 'center', color:'#141823' }} className="font-title text-3xl">Pokédex</Text>
      </View>
      <TouchableOpacity 
        activeOpacity={0.7}
        className="flex-row justify-center bg-black space-x-3 items-center p-4 rounded-xl"
        onPress={() => signInWithGithub()}
      >
        <AntDesign name="github" size={24} color="white" />
        <Text className="text-white">Login</Text>
      </TouchableOpacity>
      <View className="items-center pt-32">
        <Image className="flex w-40 h-40 justify-center" source={require('../../assets/logo.png')} />
      </View> 
    </View>
  )
}