import { TouchableOpacity, Text, View, ImageBackground } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import Pokemons from '../../assets/pokemons.png'

export function Menu ({ navigation }) {
  return (
    <View className="h-screen justify-center space-y-8 p-8">
      <StatusBar style="dark" translucent />

      <TouchableOpacity 
        activeOpacity={0.7} 
        onPress={() => navigation.navigate('Home')}
      >
        <View className='rounded-lg overflow-hidden border'>
          <ImageBackground
            source={Pokemons}
            imageStyle={{ resizeMode: 'cover' }}
            blurRadius={10}
            className='p-8 items-center'
          >
            <Text className='text-lg text-black font-title'>Pokemons</Text>

          </ImageBackground>
        </View>

      </TouchableOpacity>

      <TouchableOpacity activeOpacity={0.7} className='p-8 bg-green-600 rounded-md w-full items-center'>
      <Text className='font-title'>Lugares</Text>

      </TouchableOpacity>
    </View>
  )
}