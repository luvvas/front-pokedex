import React, { useContext } from 'react';
import { TouchableOpacity, View, Text} from 'react-native';

import { FavoritePokemonContext } from '../contexts/FavoritesContext';

import { AntDesign } from '@expo/vector-icons'; 

type Props = {
  route: any
  navigation: any
  id: number
  generation: string
}

export function Header({ navigation, route, id, generation }: Props) {
  const { title, url } = route.params;

  const { addFavoritePokemon, removeFavoritePokemon, isPokemonFavorite } = 
  useContext(FavoritePokemonContext)

  function handleFavoritePress() {
    if(isPokemonFavorite(id)) {
      removeFavoritePokemon(id);
    } else {
      addFavoritePokemon({ title, url, id });
    }
  }
  
  return (
    <View className='px-8 flex-row items-center justify-between pt-8 mt-6'>
      <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.goBack()}>
        <AntDesign name="arrowleft" size={24} color="white" />
      </TouchableOpacity>

      <Text className='text-white font-title'>{generation}</Text>

      <TouchableOpacity activeOpacity={0.7} onPress={handleFavoritePress}>
        <AntDesign name={isPokemonFavorite(id) ? 'heart' : 'hearto'} size={24} color={isPokemonFavorite(id) ? 'red' : 'white'} />
      </TouchableOpacity>
    </View>
  )
}