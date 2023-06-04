import { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View , Image } from 'react-native';
import axios from 'axios';


export function PokemonCard({ navigation, title, url }) {
  const [image, setImage] = useState('')
  const [id, setId] = useState(0)
  
  async function getPokemon() {
      const pokemonObject = await axios.get(url)
      
      setId(pokemonObject.data.id)
      setImage(pokemonObject.data.sprites.other['official-artwork'].front_default)
  }

  useEffect(() => {
    getPokemon()
  }, [])

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Pokemon', { title, url })}>
      <View className="items-center">
        <Image className='w-28 top-[40px] h-28 z-[1]' source={image ? {uri: image} : null} />
        <View className='p-6 h-28 w-36 bg-emerald-600/50 rounded-3xl items-center flex-col'>
          <Text className='font-title text-sm top-[20px]'>{title}</Text>
          <Text className='font-body text-xs top-[20px]'>#00{id}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}