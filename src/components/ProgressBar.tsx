import React from 'react';
import { Animated, View } from 'react-native';

export function ProgressBar({ progress }) {
  return (
    <View className='w-32 h-1 bg-white/50 rounded-full'>
      <Animated.View style={{ width: `${progress}%`  }} className={`h-full bg-white rounded-full`}/>
    </View>
  )
}