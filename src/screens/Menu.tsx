import { useContext, useEffect, useState } from 'react';
import { TouchableOpacity, Text, View, ImageBackground, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { AuthContext } from '../contexts/AuthContext';

import { MaterialIcons } from '@expo/vector-icons';

import Pokemons from '../../assets/pokemons.png'
import Locations from '../../assets/locations.png'

export function Menu ({ navigation }) {
  const { username, avatar, getUser, getAvatar, removeToken } = useContext(AuthContext)

  function handleLogout() {
    removeToken(navigation)
  }

  useEffect(() => {
    getUser()
    getAvatar()
  }, [])

  return (
    <View className="h-screen space-y-8 p-8">
      <StatusBar style="dark" translucent />

      <View className='flex-row items-center justify-between'>
        <View className='flex-row items-center gap-2'>
          <Image className='w-8 h-8 rounded-full' source={{ uri: avatar }} />
          <Text className='font-body'>{username}</Text>
        </View>
        <TouchableOpacity activeOpacity={0.7} onPress={handleLogout}>
          <MaterialIcons name="logout" size={24} color="red" />
        </TouchableOpacity>
      </View>

      <View className='gap-4'>
        <TouchableOpacity 
          activeOpacity={0.7} 
          onPress={() => navigation.navigate('Home')}
        >
          <View className='rounded-lg overflow-hidden border'>
            <ImageBackground
              source={Pokemons}
              imageStyle={{ resizeMode: 'cover' }}
              blurRadius={5}
              className='p-8 items-center'
            >
              <Text className='text-lg text-black font-title'>Pokemons</Text>

            </ImageBackground>
          </View>

        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.7}>
          <View className='rounded-lg overflow-hidden border'>
            <ImageBackground
              source={Locations}
              imageStyle={{ resizeMode: 'cover' }}
              blurRadius={5}
              className='p-8 items-center'
            >
              <Text className='font-title text-lg text-black'>Lugares</Text>

            </ImageBackground>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}