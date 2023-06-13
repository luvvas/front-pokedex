import React, { useContext, useEffect } from "react";
import { TouchableOpacity, View, Text } from "react-native";
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
    revocationEndpoint: 'https://github.com/settings/connections/applications/b316d223394792f3a832',
  };

  const [, response, signInWithGithub] = useAuthRequest(
    {
      clientId: 'b316d223394792f3a832',
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
        client_id: 'b316d223394792f3a832',
        client_secret: '2c9e27079bf9b0ffeee81696831e707df6f9bfef',
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
    <View className="h-screen justify-center space-y-8 p-8">
      <StatusBar style="dark" translucent />

      <TouchableOpacity 
        activeOpacity={0.7}
        className="flex-row justify-center bg-black space-x-3 items-center p-4 rounded-xl"
        onPress={() => signInWithGithub()}
      >
        <AntDesign name="github" size={24} color="white" />
        <Text className="text-white">Login with Github</Text>
      </TouchableOpacity>
    </View>
  )
}