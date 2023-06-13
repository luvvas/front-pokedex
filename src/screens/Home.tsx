import React, { useContext, useEffect, useState } from 'react';
import { Text, ScrollView, View, TouchableOpacity, Pressable, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { PokemonCard } from '../components/PokemonCard';
import { SearchBar } from '../components/SearchBar';

import { MaterialCommunityIcons, MaterialIcons, AntDesign } from '@expo/vector-icons';

import { api } from '../lib/api';

import { AuthContext } from '../contexts/AuthContext';
import { FavoritePokemonContext } from '../contexts/FavoritesContext';

export function Home({ navigation }) {
  const { avatar } = useContext(AuthContext)
  const { favoritePokemon } = useContext(FavoritePokemonContext)

  const [pokemons, setPokemons] = useState([]);
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonUrl, setPokemonUrl] = useState('');
  const [types, setTypes] = useState([])

  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState<'Pokemons' | 'Favoritos'>('Pokemons');

  const [offset, setOffset] = useState(0);

  async function listPokemons(page?) {
    const response = await api.get(`/pokemon?offset=${page}&limit=10`)

    setPokemons(prevPokemons => [...prevPokemons,...response.data.results])
    setLoading(false)
  }

  async function listTypes() {
    const response = await api.get(`/type`)
    setTypes(response.data.results)
  }

  async function searchPokemons(pokemonName) {
    setPokemons([])
    setLoading(true)

    const response = await api.get(`/pokemon/${pokemonName}`)
    
    setPokemonUrl(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    setPokemonName(response.data.name)
    setLoading(false)
  }

  async function searchTypes(type) {
    setPokemons([])
    setLoading(true)

    const response = await api.get(`/type/${type}`)
    const pokemonNameUrl = response.data.pokemon.map((p) => {
      return { name: p.pokemon.name, url: p.pokemon.url }
    })
    setPokemons(pokemonNameUrl)
    setLoading(false)
  }

  function handleLoadMore() {
    // Pra stackar só tirar isso
    setPokemons([])
    setPokemonName('')
    setPokemonUrl('')
    setLoading(true);

    setOffset(prevOffset => prevOffset + 10)
  }

  function previousPokemons() {
    setPokemons([])
    setPokemonName('')
    setPokemonUrl('')
    
    if(offset > 0) {
      setOffset(prevOffset => prevOffset - 10)
    }
  }
  
  useEffect(() => {
    listPokemons(offset)
    listTypes()
  }, [offset])
  
  // chega uma hora que começa a lagar pq é muito pokemon
  // console.log(favoritePokemon)

  return(
      <ScrollView>
        <View className='py-12 px-4'>
          {/* Header */}
          <View className='px-4 flex-row justify-between'>
            <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.goBack()}>
              <AntDesign name="arrowleft" size={24} color="black" />
            </TouchableOpacity>
            {avatar ? (
              <Image className='w-8 h-8 rounded-full' source={{uri: avatar}} />
            ) : (
              <Text>No avatar available</Text>
            )}
          </View>

          <View className='px-4 mb-4 pt-4'>
            <StatusBar style="dark" translucent />

            {/* Title and Description */}
            <Text className="font-title text-3xl">Pokédex</Text>
            <Text className="font-body text-xs">Procure pelo nome ou número na Pokédex</Text>
            
            {/* Search Bar */}
            <SearchBar onSearch={searchPokemons} />

            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View className='flex-row justify-between mt-4 space-x-2'>
            {types.map((type, index) => {
              return(
                <View key={index}>
                  <TouchableOpacity
                    activeOpacity={0.7} 
                    onPress={() => searchTypes(type.name)}
                    className={`px-4 h-6 bg-black items-center justify-center rounded-full`}
                  >
                    <Text className='text-xs text-white font-alt'>{type.name}</Text>
                  </TouchableOpacity>
                </View>
              )
            })}
            </View>
            </ScrollView>
          </View>

          <View className={`px-4 flex-row items-center ${currentView === 'Pokemons' ? 'justify-between' : 'justify-center' } gap-5`}>
            { currentView === 'Pokemons' && (
              <View className='bg-gray-300 rounded-full p-2'>
                <Pressable onPress={previousPokemons}>
                  <MaterialIcons name="arrow-left" size={24} color="black" />
                </Pressable>
              </View>
            )}

            <Pressable onPress={() => setCurrentView('Pokemons')}>
              <Text className='font-title'>Pokemons</Text>
              {currentView === 'Pokemons' && (
                <View className='bg-black h-[2px] rounded block' />
              )}
            </Pressable>
            <Pressable onPress={() => setCurrentView('Favoritos')}>
              <Text className='font-title'>Favoritos</Text>
              {currentView === 'Favoritos' && (
                <View className='bg-black h-[2px] rounded block}' />
              )}
            </Pressable>

            { currentView === 'Pokemons' && (
              <View className='bg-gray-300 rounded-full p-2'>
                <Pressable onPress={handleLoadMore}>
                  <MaterialIcons name="arrow-right" size={24} color="black" />
                </Pressable>
              </View>
            )}
          </View>

          {loading ? (
            <View className='justify-center items-center mt-10'>
              <Text className='font-title'>Loading</Text>
            </View>
          ) : (
            // Pokemon Card
            currentView === 'Pokemons' && (
              <View className='overflow-hidden px-4'>
                <View className='w-auto flex-row flex-wrap top-[-30px] justify-between'>
                  {/* Renders the Pokemons List */}
                  {pokemons.map((pokemon, index) => {
                    return (
                      <View key={index}>
                        <PokemonCard navigation={navigation} title={pokemon.name} url={pokemon.url}/>
                      </View>
                    )
                  })}
  
                  {/* Renders the searched Pokemon Name */}
                  {pokemonName && pokemonUrl && (
                    <View>
                      <PokemonCard navigation={navigation} title={pokemonName} url={pokemonUrl} />
                    </View>
                  )}
                </View>
  
                <View className='items-center'>
                  <TouchableOpacity className="items-center bg-gray-300 p-4 rounded-full" onPress={handleLoadMore}>
                    <MaterialCommunityIcons name="pokeball" size={28} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
            )
          )}
                
          {currentView === 'Favoritos' && (
            <View className='overflow-hidden px-4'>
              <View className='w-auto flex-row flex-wrap top-[-30px] justify-between'>
                {/* Renders the Pokemons List */}
                {favoritePokemon.map((pokemon, index) => {
                  return (
                    <View key={index}>
                      <PokemonCard navigation={navigation} title={pokemon.title} url={pokemon.url}/>
                    </View>
                  )
                })}

                {/* Renders the searched Pokemon Name */}
                {pokemonName && pokemonUrl && (
                  <View>
                    <PokemonCard navigation={navigation} title={pokemonName} url={pokemonUrl} />
                  </View>
                )}
              </View>
            </View>
          )}
        </View>
      </ScrollView>
  )
}