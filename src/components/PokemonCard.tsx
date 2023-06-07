import { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View , Image } from 'react-native';
import axios from 'axios';

import { transparentize } from 'polished';

export function PokemonCard({ navigation, title, url }) {
  const [id, setId] = useState(0)
  const [image, setImage] = useState('')
  const [color, setColor] = useState('')
  
  async function getPokemon() {
      const responseData = await axios.get(url)
      const pokemonData = responseData.data

      setId(pokemonData.id)
      setImage(pokemonData.sprites.other['official-artwork'].front_default)
    
      const responseSpecies = await axios.get(pokemonData.species.url)
      const pokemonSpecies = responseSpecies.data

      const darkenedColor = transparentize(0.4, pokemonSpecies.color.name)
      setColor(darkenedColor)
    }

  useEffect(() => {
    getPokemon()
  }, [])

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Pokemon', { title, url, image, id, color })}>
      <View className="items-center">
        <Image className='w-28 top-[40px] h-28 z-[1]' source={image ? {uri: image} : null} />
        <View style={{ backgroundColor: `${color}` }} className='p-6 h-28 w-36 rounded-3xl items-center flex-col'>
          <Text className='font-title text-sm top-[20px]'>{title}</Text>
          <Text className='font-body text-xs top-[20px]'>#00{id}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}