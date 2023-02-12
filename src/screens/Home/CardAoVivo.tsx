import React from 'react';
import { VStack, Text } from 'native-base';
import { ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';

import { Programa } from '../../services/APIService';

type Props = {
  programa?: Programa;
};

export function CardAoVivo({ programa }: Props) {
  return (
    <ImageBackground 
      source={{ uri: programa?.thumbnail, cache: 'force-cache' }}
      resizeMode="cover"
      imageStyle={{ borderRadius: 3 }}
      style={{
        height: 250,
        // margin: 25,
      }}
    >
      <VStack 
        flex={1} 
        backgroundColor={'rgba(0, 0, 0, 0.4)'}
        paddingX={3}
        paddingY={1}
        borderRadius={3}
        height={250}
        alignItems={'flex-start'}
        justifyContent={'flex-end'}
      >
        <VStack
          backgroundColor={'#BF2832'}
          paddingX={3}
          paddingY={0.5}
          borderRadius={10}
        >
          <Text color={'white'} fontWeight={'bold'} fontSize={12}>AO VIVO</Text>
        </VStack>
        <Text 
          width={'100%'} 
          color={'white'}
          fontSize={22}
          fontWeight={'bold'}
        >{programa?.name || 'Assista ao vivo'}</Text>
      </VStack>
    </ImageBackground>
  )
}
