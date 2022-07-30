import React, { useEffect } from 'react';
import { VStack } from 'native-base';
import VideoPlayer from 'react-native-video-controls';

export function TV({ navigation }: any) {
  let player: { _togglePlayPause: () => void; };

  useEffect(() => {
    console.log('init');
  }, []);

  const source = {
    uri: "http://live26.jmvstream.com:1935/AVJ-11391/playlist/playlist.m3u8",
    type: 'm3u8'
  };

  function onClickBack() {
    navigation.goBack();
  }

  return (
    <VStack flex={1} bg="black">
      <VideoPlayer
        ref={(ref: any) => {
          player = ref;
        }} 
        source={source}
        onError={(err: any) => {
          console.log(err);
        }}
        onBack={onClickBack}
        disableSeekbar={true}
        disableTimer={true}
        videoStyle={{
          width: '100%',
          height: '100%',
        }}
      />
    </VStack>
  );
}
