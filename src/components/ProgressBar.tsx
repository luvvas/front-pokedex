import React from 'react';
import { View } from 'react-native';

export function ProgressBar({ progress }) {
  return (
    <View className='w-32 h-1 bg-white/50 rounded-full'>
      <View style={{ width: `${progress}%` }} className={`h-full bg-white rounded-full`}/>
    </View>
  )
}