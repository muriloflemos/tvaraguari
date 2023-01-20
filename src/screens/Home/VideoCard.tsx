import React from 'react';
import { VStack, Text } from 'native-base';
import { ImageBackground } from 'react-native';

import { Video } from '../../services/APIService';

type Props = {
  video: Video;
};

export function VideoCard({ video }: Props) {
  return (
    <ImageBackground 
      source={{ uri: video?.thumbnail, cache: 'force-cache' }}
      resizeMode="cover"
      imageStyle={{ borderRadius: 8 }}
      style={{
        width: 160,
        height: 100,
        marginVertical: 8,
        marginRight: 10,
      }}
    >
      <VStack 
        flex={1} 
        backgroundColor={'rgba(0, 0, 0, 0.4)'}
        borderRadius={8}
        height={100}
        alignItems={'flex-start'}
        justifyContent={'flex-end'}
      >
        <VStack
          width={'100%'}
          backgroundColor={'rgba(0, 0, 0, 0.4)'}
          paddingY={0.5}
          paddingX={1}
        >
          <Text 
            width={'100%'} 
            color={'white'}
            fontSize={12}
            fontWeight={'bold'}
            numberOfLines={1}
          >{video.name}</Text>
        </VStack>
      </VStack>
    </ImageBackground>
  )
}
