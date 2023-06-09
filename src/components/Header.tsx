import React, { useContext } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { FavoritePokemonContext } from '../contexts/FavoritesContext';

import { AntDesign } from '@expo/vector-icons'; 

type Props = {
  route: any
  navigation: any
  id: number
}

export function Header({ navigation, route, id }: Props) {
  const { title, url } = route.params;

  const { addFavoritePokemon, removeFavoritePokemon, isPokemonFavorite } = 
  useContext(FavoritePokemonContext)
  console.log(id)

  function handleFavoritePress() {
    if(isPokemonFavorite(id)) {
      removeFavoritePokemon(id);
    } else {
      addFavoritePokemon({ title, url, id });
    }
  }
  
  return (
    <View className='px-8 flex-row justify-between pt-8 mt-6'>
      <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.goBack()}>
        <AntDesign name="arrowleft" size={24} color="white" />
      </TouchableOpacity>

      <TouchableOpacity activeOpacity={0.7} onPress={handleFavoritePress}>
        <AntDesign name={isPokemonFavorite(id) ? 'heart' : 'hearto'} size={24} color="white" />
      </TouchableOpacity>
    </View>
  )
}