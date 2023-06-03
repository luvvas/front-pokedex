import { Text, TouchableOpacity, View , Image } from 'react-native';

import Bulbasaur from '../../assets/bulbasaur.png';

export function PokemonCard({ navigation, title, code }) {
  return (
    <View className='px-2'>
      <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Pokemon')}>
        <View className="items-center">
          <Image className='w-28 top-[40px] h-28 z-[1]' source={Bulbasaur} />
          <View className='p-6 h-28 bg-emerald-600/50 rounded-3xl flex-col'>
            <Text className='font-title text-base top-[20px]'>{title}</Text>
            <Text className='font-body text-xs top-[20px]'>{code}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}