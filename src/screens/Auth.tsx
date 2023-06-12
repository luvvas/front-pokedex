import React, { useEffect } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';

import { AntDesign } from '@expo/vector-icons'; 

import axios from "axios";

export function Auth () {

  const discovery = {
    authorizationEndpoint: 'https://github.com/login/oauth/authorize',
    tokenEndpoint: 'https://github.com/login/oauth/access_token',
    revocationEndpoint: 'https://github.com/settings/connections/applications/b316d223394792f3a832',
  };

  const [request, response, signInWithGithub] = useAuthRequest(
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
    return access_token
  }

  useEffect(() => {
    if(response?.type === 'success') {
      const { code } = response.params

      const getResult = async () => {
        const result = await getAuthentication(code);
        console.log(result);
      };

      getResult();
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