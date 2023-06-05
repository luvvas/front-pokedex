import React, { useEffect, useState } from 'react'
import { Text, View, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { Header } from '../components/Header';
import { ProgressBar } from '../components/ProgressBar';

import axios from 'axios';

export function Pokemon({ navigation, route }) {
  const { title, url, image, id } = route.params;
  const [types, setTypes] = useState([])
  const [weight, setWeight] = useState(0)
  const [height, setHeight] = useState(0)
  const [stats, setStats] = useState([])

  async function getPokemon() {
    const response = await axios.get(url)
    
    setTypes(response.data.types)
    setWeight(response.data.weight)
    setHeight(response.data.height)
    setStats(response.data.stats)
  }
  
  useEffect(() => {
    getPokemon()
  }, [])

  const formattedWeight = weight / 10;
  const formattedHeight = height / 10;

  return (
    <View>
      <View className={`bg-pokemon-grass w-full h-full`}>
        <StatusBar style="light" translucent />

        {/* Header */}
        <Header navigation={navigation}/>

        {/* Pokemon Name and ID */}
        <View className='px-8 pt-3 flex-row items-baseline space-x-2'>
          <Text className='text-3xl text-white font-title'>{title}</Text>
          <Text className='text-sm text-white font-alt'>#000{id}</Text>
        </View>

        {/* Pokemon Types */}
        <View className='px-8 pt-2 flex-row gap-4 items-center'>
        {types.map((type) => {
          return(
              <View key={type.slot} className='bg-white/50 w-20 h-8 items-center justify-center rounded-full'>
                <Text className='text-sm text-white font-title'>{type.type.name}</Text>
              </View>
          )
        })}
        </View>

        {/* Pokemon Status and Image */}
        <View className='flex-row justify-between z-[1]'>
          {/* Pokemon Status */}
          <View className='px-8 pb-5 mt-6'>
            {stats.map((stat) => {
              return (
                <View key={stat.stat.name}>
                  <Text className="text-white font-title mb-[-7px]">{stat.stat.name.toUpperCase()}</Text>
                  <ProgressBar progress={stat.base_stat} />
                </View>
              )
            })}
          </View>
          
          {/* Pokemon Image */}
          <View className='px-8 justify-center items-center'>
            <Image className='w-52 h-52 ml-[-90px] mb-[-60px]' source={image ? {uri: image} : null} />
          </View>
        </View>
        <View className='px-8 pt-6 bg-white border h-full rounded-t-3xl'>
          {/* Pokemon Weight/Height */}
          <View className='flex-row items-center justify-between px-10 bg-emerald-600 w-full h-20 rounded-2xl mt-5'>
            <View className='items-center'>
              <Text className='text-white text-lg font-title'>WEIGHT</Text>
              <Text className='text-white text-xl font-title'>{formattedWeight} kg</Text>
            </View>

            <View className="bg-white w-[2px] h-3" />

            <View className='items-center'>
              <Text className='text-white text-lg font-title'>HEIGHT</Text> 
              <Text className='text-white text-xl font-title'>{formattedHeight} m</Text>
            </View>
          </View>

          <View className='items-center justify-center mt-4'>
            <Text className='text-center font-body'>There is a plant seed on its back right from the day this pokémon is born. The seed slowly grows larger.</Text>
          </View>
        </View>
        
      </View>
    </View>
  );
}