import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { AntDesign } from '@expo/vector-icons'; 

export function Header({ navigation }) {
  return (
    <View className='px-8 flex-row justify-between pt-8 mt-6'>
      <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.goBack()}>
        <AntDesign name="arrowleft" size={24} color="white" />
      </TouchableOpacity>

      <TouchableOpacity activeOpacity={0.7}>
        <AntDesign name="hearto" size={24} color="white" />
      </TouchableOpacity>
    </View>
  )
}