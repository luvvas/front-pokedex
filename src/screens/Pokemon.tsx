import React, { useEffect } from 'react'
import { Text, View, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { Header } from '../components/Header';

import Bulbasaur from '../../assets/bulbasaur.png';

import { api } from '../lib/api'

export function Pokemon({ navigation }) {
  // async function listPokemons() {
  //   const response = await api.get('/pokemon')

  //   console.log(response.data.results)
  // }

  // useEffect(() => {
  //   listPokemons()
  // }, [])

  return (
    <View className='bg-emerald-600 w-full h-full'>
      <StatusBar style="light" translucent />

      {/* Header */}
      <Header navigation={navigation}/>

      {/* Pokemon Name and ID */}
      <View className='px-8 pt-3 flex-row items-baseline space-x-2'>
        <Text className='text-3xl text-white font-title'>Bulbasaur</Text>
        <Text className='text-sm text-white font-alt'>#0001</Text>
      </View>

      {/* Pokemon Types */}
      <View className='px-8 pt-2 flex-row gap-4 items-center'>
        <View className='bg-white/50 w-20 h-8 items-center justify-center rounded-full'>
          <Text className='text-sm text-white font-title'>Grass</Text>
        </View>
        
        <View className='bg-white/50 w-20 h-8 items-center justify-center rounded-full'>
          <Text className='text-sm text-white font-title'>Poison</Text>
        </View>
      </View>

      {/* Pokemon Status and Image */}
      <View className='flex-row justify-between'>
        {/* Pokemon Status */}
        <View className='px-8 pb-5 mt-6'>
          <View>
            <Text className="text-white font-title mb-[-5px]">HP</Text>
            <View className='bg-white/50 w-32 h-1 rounded-full' />
          </View>
          
          <View>
            <Text className="text-white font-title mb-[-7px]">ATTACK</Text>
            <View className='bg-white/50 w-32 h-1 rounded-full' />
          </View>

          <View>
            <Text className="text-white font-title mb-[-7px]">DEFENSE</Text>
            <View className='bg-white/50 w-32 h-1 rounded-full' />
          </View>
          
          <View>
            <Text className="text-white font-title mb-[-7px]">S.ATTACK</Text>
            <View className='bg-white/50 w-32 h-1 rounded-full' />
          </View>

          <View>
            <Text className="text-white font-title mb-[-7px]">S.DEFENSE</Text>
            <View className='bg-white/50 w-32 h-1 rounded-full' />
          </View>

          <View>
            <Text className="text-white font-title mb-[-7px]">SPEED</Text>
            <View className='bg-white/50 w-32 h-1 rounded-full' />
          </View>
        </View>
        
        {/* Pokemon Image */}
        <View className='px-8 justify-center items-center'>
          <Image className='ml-[-90px] mb-[-60px]' source={Bulbasaur} />
        </View>
      </View>

      <View className='px-8 pt-6 bg-white h-full rounded-t-3xl'>
        {/* Pokemon Weight/Height */}
        <View className='flex-row items-center justify-between px-10 bg-emerald-600 w-full h-20 rounded-2xl mt-5'>
          <View className='items-center'>
            <Text className='text-white text-lg font-title'>WEIGHT</Text>
            <Text className='text-white text-xl font-title'>6,9 kg</Text>
          </View>

          <View className="bg-white w-[2px] h-3" />

          <View className='items-center'>
            <Text className='text-white text-lg font-title'>HEIGHT</Text> 
            <Text className='text-white text-xl font-title'>0,7 m</Text>
          </View>
        </View>

        <View className='items-center justify-center mt-4'>
          <Text className='text-center font-body'>There is a plant seed on its back right from the day this pokémon is born. The seed slowly grows larger.</Text>
        </View>
      </View>
      
    </View>
  );
}