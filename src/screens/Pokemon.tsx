import React, { useState, useEffect } from 'react'
import { Text, View, Image, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { Header } from '../components/Header';
import { ProgressBar } from '../components/ProgressBar';

import axios from 'axios';

export interface Stat {
  base_stat: number
  effort: number
  stat: Stat2
}

export interface Stat2 {
  name: string
  url: string
}

export interface Type {
  slot: number
  type: Type2
}

export interface Type2 {
  name: string
  url: string
}

export interface Ability {
  ability: Ability2
  is_hidden: boolean
  slot: number
}

export interface Ability2 {
  name: string
  url: string
}

export interface Species {
  name: string
  url: string
}

export interface Color {
  name: string
}

type PokemonSpecies = {
  color: Color
}

type PokemonData = {
  weight: number;
  height: number;
  base_experience: number;
  abilities: Ability[];
  types: Type[];
  stats: Stat[];
  species: Species[];
}

export function Pokemon({ navigation, route }) {
  const { title, url, image, id } = route.params;

  const [pokemonData, setPokemonData] = useState<null | PokemonData>(null)
  const [pokemonSpecies, setPokemonSpecies] = useState<null | PokemonSpecies>(null)
  const [currentView, setCurrentView] = useState<'Informations' | 'Abilities' | 'Evolutions'>('Informations')
  
  async function getPokemon() {
    const responseData = await axios.get<PokemonData>(url)
    const pokemonData = responseData.data
    setPokemonData(pokemonData)

    const responseSpecies = await axios.get<PokemonSpecies>(pokemonData.species.url)
    const pokemonSpecies = responseSpecies.data
    setPokemonSpecies(pokemonSpecies)

    // color
    // evolution_chain
    // flavor_text_entries
    // generation
    // growth_rate
    // habitat
  }

  useEffect(() => {
    getPokemon()
  }, [])

  const formattedWeight = pokemonData?.weight && pokemonData.weight / 10;
  const formattedHeight = pokemonData?.height && pokemonData.height / 10;

  return (
    
    <View>
      {pokemonSpecies?.color.name && (
        <View style={{ backgroundColor: `${pokemonSpecies?.color.name}` }} className="w-full h-full">
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
            <View className='flex-row text-center items-center gap-2 mt-2'>
              <View style={{ backgroundColor: `${pokemonSpecies?.color.name}` }} className='p-2 w-10 items-center justify-center rounded-full'>
                <Text className='text-white font-alt'>{pokemonData?.base_experience}</Text>
              </View>
              <Text style={{ color: `${pokemonSpecies?.color.name}` }} className='font-title'>Base Experience</Text>
            </View>

            {/* Button tabs */}
            <View className='mt-4 flex-row justify-between'>
              <Pressable
                onPress={() => setCurrentView('Informations')}
                className='bg-white'
              >
                <Text style={{ color: `${pokemonSpecies?.color.name}` }} className='font-title'>Informations</Text>
              </Pressable>
              <Pressable
                onPress={() => setCurrentView('Abilities')}
                className='bg-white'
              >
                <Text style={{ color: `${pokemonSpecies?.color.name}` }} className='font-title'>Abilities</Text>
              </Pressable>
              <Pressable
                onPress={() => setCurrentView('Evolutions')}
                className='bg-white'
              >
                <Text style={{ color: `${pokemonSpecies?.color.name}` }} className='font-title'>Evolutions</Text>
              </Pressable>
            </View>
              

              {currentView === 'Informations' && (
                <View style={{ backgroundColor: `${pokemonSpecies?.color.name}` }} className='flex-row items-center justify-between px-10 w-full h-20 rounded-2xl mt-5'>
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
              )}

              {currentView === 'Abilities' && (
                pokemonData.abilities.map((ability, index) => {
                  return (
                    <View 
                      key={index}
                      style={{ backgroundColor: `${pokemonSpecies?.color.name}` }}
                      className='w-full pl-2 py-3 rounded-lg mt-5'
                    >
                      <Text className='font-title text-white'>{ability.ability.name}</Text>
                    </View>
                  )
                })
              )}

              {currentView === 'Evolutions' && (
                <View style={{ backgroundColor: `${pokemonSpecies?.color.name}` }} className='flex-row items-center justify-between px-10 w-full h-20 rounded-2xl mt-5'>
                  <View className='items-center'>
                    <Text className='text-white text-lg font-title'>WEIGHT2</Text>
                    <Text className='text-white text-xl font-title'>{formattedWeight} kg</Text>
                  </View>

                  <View className="bg-white w-[2px] h-3" />

                  <View className='items-center'>
                    <Text className='text-white text-lg font-title'>HEIGHT2</Text> 
                    <Text className='text-white text-xl font-title'>{formattedHeight} m</Text>
                  </View>
                </View>
              )}  
            </View>
          </View>
        
      )}
      </View>
  );
}