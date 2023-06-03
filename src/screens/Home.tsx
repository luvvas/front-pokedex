import React from 'react'
import { Text, TextInput, ScrollView, View , FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { PokemonCard } from '../components/PokemonCard';

import { AntDesign } from '@expo/vector-icons'; 

const DATA = [
  {
    title: 'Bulbasaur',
    id: '#001',
  },
  {
    title: 'Bulbasaur',
    id: '#002',
  },
  {
    title: 'Bulbasaur',
    id: '#003',
  },
  {
    title: 'Bulbasaur',
    id: '#004',
  },
  {
    title: 'Bulbasaur',
    id: '#005',
  },
  {
    title: 'Bulbasaur',
    id: '#006',
  }
];


export function Home({ navigation }) {
  return(
    <ScrollView>
      <View className='py-12 px-4'>
        <View className='px-4 mb-4'>
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
        <View className='overflow-hidden'>
        <View className='pl-2 top-[-30px]'>
          {/* FlatList */}
          <FlatList 
            data={DATA}
            renderItem={({item}) => <PokemonCard navigation={navigation} title={item.title} code={item.id}/>}
            keyExtractor={item => item.id}
            numColumns={2}
          />
        </View>
        </View>
      </View>
    </ScrollView>
  )
}