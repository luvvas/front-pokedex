import React, { useEffect, useState } from 'react'
import { Text, TextInput, ScrollView, View , Button, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { PokemonCard } from '../components/PokemonCard';

import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'; 

import { api } from '../lib/api'

export function Home({ navigation }) {
  const [pokemons, setPokemons] = useState([])
  const [offset, setOffset] = useState(0);

  async function listPokemons(page?) {
    const response = await api.get(`/pokemon?offset=${page}&limit=10`)

    setPokemons(prevPokemons => [...prevPokemons,...response.data.results])
  }

  function handleLoadMore() {
    setOffset(prevOffset => prevOffset + 20)
  }

  useEffect(() => {
    listPokemons(offset)
  }, [offset])

  // chega uma hora que começa a lagar pq é muito pokemon
  console.log(pokemons)

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
            {pokemons.map((pokemon, index) => {
              return (
                <View key={index}>
                  <PokemonCard navigation={navigation} title={pokemon.name} url={pokemon.url}/>
                </View>
              )
            })}
          </View>
        </View>

        <View className='items-center'>
          <TouchableOpacity className="items-center bg-gray-300 p-4 rounded-full" onPress={handleLoadMore}>
            <MaterialCommunityIcons className='' name="pokeball" size={24} color="red" />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}