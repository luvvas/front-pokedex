import React, { useState } from 'react'
import { Text, View, Image, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { Header } from '../components/Header';
import { ProgressBar } from '../components/ProgressBar';

export function Pokemon({ navigation, route }) {
  const { title, url, image, id, color, pokemonData, pokemonSpecies, pokemonEvolutions } = route.params;

  const [currentView, setCurrentView] = useState<'Informations' | 'Abilities' | 'Evolutions'>('Informations')

  const formattedWeight = pokemonData?.weight && pokemonData.weight / 10;
  const formattedHeight = pokemonData?.height && pokemonData.height / 10;
  const formattedFlavorText = pokemonSpecies?.flavor_text_entries[0].flavor_text.replace(/\n/g, ' ')

  console.log(pokemonEvolutions)

  return (
    <View>
        <View style={{ backgroundColor: `${color}` }} className="w-full h-full">
          <StatusBar style="light" translucent />

          {/* Header */}
          <Header id={id} generation={pokemonSpecies?.generation?.name} route={route} navigation={navigation}/>

          {/* Pokemon Name and ID */}
          <View className='px-8 pt-3 flex-row items-baseline space-x-2'>
            <Text className='text-3xl text-white font-title'>{title}</Text>
            <Text className='text-sm text-white font-alt'>#{id}</Text>
          </View>

          {/* Pokemon Types */}
          <View className='px-8 pt-2 flex-row gap-4 items-center'>
          {pokemonData?.types.map((type) => {
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
              {pokemonData?.stats.map((stat) => {
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
            {/* Base Experience */}
            <View className='mt-2 justify-between flex-row'>
              <View className='flex-row gap-2 text-center items-center'>
                <View style={color && { backgroundColor: `${color}` }} className='p-2 w-10 items-center justify-center rounded-full'>
                  <Text className='text-white font-alt'>{pokemonData?.base_experience}</Text>
                </View>
                <Text style={color && { color: `${color}` }} className='font-title'>Base Experience</Text>
              </View>

              {/* USAR HABITAT EM OUTRO LUGAR */}
              {/* <Text style={{ color: `${color}` }} className='font-alt py-2'>{pokemonSpecies?.habitat?.name}</Text> */}
            </View>

            {/* Button tabs */}
            <View className='mt-4 flex-row justify-between'>
              {/* Information Button */}
              <Pressable
                onPress={() => setCurrentView('Informations')}
                className='bg-white'
              >
                <Text style={color && { color: `${color}` }} className='font-title'>Informations</Text>
                {currentView === 'Informations' && (
                  <View style={color && { backgroundColor: `${color}` }} className='bg-black h-[2px] rounded block' />
                )}
              </Pressable>
              
              {/* Abilities Button */}
              <Pressable
                onPress={() => setCurrentView('Abilities')}
                className='bg-white'
              >
                <Text style={color && { color: `${color}` }} className='font-title'>Abilities</Text>
                {currentView === 'Abilities' && (
                  <View style={color && { backgroundColor: `${color}` }} className={'bg-black h-[2px] rounded block'} />
                )}
              </Pressable>
              
              {/* Evolutions Button */}
              <Pressable
                onPress={() => setCurrentView('Evolutions')}
                className='bg-white'
              >
                <Text style={color && { color: `${color}` }} className='font-title'>Evolutions</Text>
                {currentView === 'Evolutions' && (
                  <View style={color && { backgroundColor: `${color}` }} className={'bg-black h-[2px] rounded block'} />
                )}
              </Pressable>
            </View>
              
              {/* Informations View */}
              {currentView === 'Informations' && (
                <>
                <View style={color && { backgroundColor: `${color}` }} className='flex-row items-center justify-between px-10 w-full h-20 rounded-2xl mt-5'>
                  <View className='items-center'>
                    <Text className='text-white text-lg font-title'>WEIGHT</Text>
                    <Text className='text-white text-xl font-body'>{formattedWeight} kg</Text>
                  </View>

                  <View className="bg-white w-[2px] h-3" />

                  <View className='items-center'>
                    <Text className='text-white text-lg font-title'>HEIGHT</Text> 
                    <Text className='text-white text-xl font-body'>{formattedHeight} m</Text>
                  </View>
                </View>

                <View className='mt-5 '>
                  <Text className='font-body text-center'>{formattedFlavorText}</Text>
                </View>
                </>
              )}

              {/* Abilities View */}
              {currentView === 'Abilities' && (
                pokemonData.abilities.map((ability, index) => {
                  return (
                    <View 
                      key={index}
                      style={color && { backgroundColor: `${color}` }}
                      className='w-full pl-2 py-3 rounded-lg mt-5'
                    >
                      <Text className='font-title text-white'>{ability.ability.name}</Text>
                    </View>
                  )
                })
              )}

              {/* Evolutions View */}
              {currentView === 'Evolutions' && (
                pokemonEvolutions.map((evolution, index) => {
                  return (
                    <View 
                      key={index} 
                      style={color && { backgroundColor: `${color}` }} 
                      className='w-full pl-2 py-3 rounded-lg mt-5'
                    >
                      <Text className='font-title text-white'>{evolution}</Text>
                    </View>
                  )
                })
              )}  
            </View>
          </View>
      </View>
  );
}