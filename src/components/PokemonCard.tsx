import { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View , Image } from 'react-native';
import { transparentize } from 'polished';
import axios from 'axios';

import { PokemonData, PokemonSpecies } from '../types/pokemon';

export function PokemonCard({ navigation, title, url }) {
  const [pokemonData, setPokemonData] = useState<null | PokemonData>(null)
  const [pokemonSpecies, setPokemonSpecies] = useState<null | PokemonSpecies>(null)
  const [pokemonEvolutions, setPokemonEvolutions] = useState(null)
  
  const [id, setId] = useState(0)
  const [image, setImage] = useState('')
  
  const [color, setColor] = useState('')
  
  async function getPokemonData() {
    const responseData = await axios.get<PokemonData>(url)
    const pokemonData = responseData.data
    setPokemonData(pokemonData)

    setId(pokemonData.id)
    setImage(pokemonData.sprites.other['official-artwork'].front_default)
    
    const responseSpecies = await axios.get<PokemonSpecies>(pokemonData.species.url)
    setPokemonSpecies(responseSpecies.data)
    const darkenedColor = transparentize(0.4, responseSpecies.data.color.name)
    setColor(darkenedColor)

    const responseEvolution = await axios.get(responseSpecies.data.evolution_chain.url)
    const allEvolutions = getAllEvolutions(responseEvolution.data)
    setPokemonEvolutions(allEvolutions)
  }

  function getAllEvolutions(data) {
    const evolutions = [];

    function getEvolution(chain) {
      if(chain.species && chain.species.name) {
        evolutions.push(chain.species.name)
      }

      if (chain.evolves_to && chain.evolves_to.length > 0) {
        chain.evolves_to.forEach((evolution) => {
          getEvolution(evolution);
        });
      }
    }

    getEvolution(data.chain)
    return evolutions
  }

  useEffect(() => {
    getPokemonData()
  }, [])


  return (
    <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('Pokemon', { title, url, image, id, color, pokemonData, pokemonSpecies, pokemonEvolutions })}>
      <View className="items-center">
        <Image className='w-28 top-[40px] h-28 z-[1]' source={image ? {uri: image} : null} />
        <View style={{ backgroundColor: 'white', elevation: 16, shadowColor: 'black', shadowOpacity: 0.58, shadowOffset: { width: 0, height: 12 }, shadowRadius: 16  }} className="rounded-3xl">
          <View style={{ backgroundColor: `${color}` }} className='p-6 h-28 w-36 rounded-3xl items-center flex-col'>
            <Text className='font-title text-sm top-[20px]'>{title}</Text>
            <Text className='font-body text-xs top-[20px]'>#{pokemonData?.id}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}