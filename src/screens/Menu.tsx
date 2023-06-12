import { TouchableOpacity, Text, View, ImageBackground } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import Pokemons from '../../assets/pokemons.png'
import Locations from '../../assets/locations.png'


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
            blurRadius={5}
            className='p-8 items-center'
          >
            <Text className='text-lg text-black font-title'>Pokemons</Text>

          </ImageBackground>
        </View>

      </TouchableOpacity>

      <TouchableOpacity activeOpacity={0.7}>
        <View className='rounded-lg overflow-hidden border'>
          <ImageBackground
            source={Locations}
            imageStyle={{ resizeMode: 'cover' }}
            blurRadius={5}
            className='p-8 items-center'
          >
            <Text className='font-title text-lg text-black'>Lugares</Text>

          </ImageBackground>
        </View>
      </TouchableOpacity>
    </View>
  )
}