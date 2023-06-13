import React, { useState } from "react";
import { TextInput, View } from "react-native";

import { AntDesign } from '@expo/vector-icons'; 

export function SearchBar({ onSearch }) {
  const [search, setSearch] = useState('');

  function handleSearch() {
    onSearch(search)
  }

  return (
    <View className='w-[80%] p-2 bg-gray-300 rounded-full'>
      <View className='left-3 flex-row items-center space-x-3'>
        <AntDesign name="search1" size={20} color="black" />
        <TextInput 
          value={search}
          onChangeText={(text) => setSearch(text)}
          onSubmitEditing={handleSearch}
          placeholder='Nome ou número'
        />
      </View>
    </View>
  )
}