import React, { useEffect, useState } from 'react'
import { Text, TextInput, ScrollView, View , FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { PokemonCard } from '../components/PokemonCard';

import { AntDesign } from '@expo/vector-icons'; 

import { api } from '../lib/api'

export function Home({ navigation }) {
  const [pokemons, setPokemons] = useState([])

  async function listPokemons() {
    const response = await api.get('/pokemon')

    setPokemons(response.data.results)
  }

  useEffect(() => {
    listPokemons()
  }, [])

  return(
    <ScrollView>
      <View className='py-12 px-4'>
        <View className='px-4 mb-4 pt-8'>
          <StatusBar style="dark" translucent />

          {/* Title and Description */}
          <Text className="font-title text-3xl">Pokédex</Text>
          <Text className="font-body text-xs">Procure pelo nome ou número na Pokédex</Text>
          
          {/* Search Bar */}
          <View className='mt-4 p-2 bg-gray-300 rounded-full'>
            <View className='left-3 flex-row items-center space-x-3'>
              <AntDesign name="search1" size={20} color="black" />
              <TextInput placeholder='Nome ou número'/>
            </View>
          </View>
        </View>

        {/* Pokemon Card */}
        <View className='overflow-hidden px-4'>
          <View className='w-auto flex-row flex-wrap top-[-30px] justify-between'>
            {/* Pokemons List */}
            {pokemons.map((pokemon) => {
              return (
                <View key={pokemon.name}>
                  <PokemonCard navigation={navigation} title={pokemon.name} url={pokemon.url}/>
                </View>
              )
            })}
          </View>
        </View>
      </View>
    </ScrollView>
  )
}