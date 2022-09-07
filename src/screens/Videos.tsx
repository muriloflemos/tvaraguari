import React from 'react';
import { VStack, HStack, IconButton, Text, ScrollView, Flex, Box, Center, Image, AspectRatio } from 'native-base';
import { StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft, faPlayCircle } from '@fortawesome/free-solid-svg-icons';

import background from '../assets/images/background.png';
import { JMVVideo } from '../services/JMVService';

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  thumbnailIcon: {
    position: 'absolute',
  }
});

export function Videos({ route, navigation }: any) {
  const { gallery } = route.params;

  const onClickBack = () => {
    navigation.goBack();
  }

  function renderPlaceholder() {
    return (
      <Center flex="1">
        <FontAwesomeIcon size={35} icon={faPlayCircle} color="#ffffff" />
      </Center>
    );
  }

  function renderThumbnail(video: JMVVideo) {
    let thumbnail;

    if (!video?.thumbnail.includes('jmvtechnology.comnull')) {
      thumbnail = video.thumbnail;
    } else if (video.covers) {
      thumbnail = video.covers[0];
    } else {
      return renderPlaceholder();
    }

    return (
      <Image
        h="100%"
        w="full"
        resizeMode="cover"
        source={{
          uri: thumbnail,
        }}
        alt={video.name}
      />
    );
  }

  function handleVideoClick(video: JMVVideo) {
    navigation.navigate('TV', { url: video.playerSource });
  }

  function renderVideos() {
    return (
      <ScrollView 
        flex={1}
        mt="5"
      >
        <Flex 
          flexDirection="row" 
          flexWrap="wrap" 
          px="5"
          justifyContent="space-between"
        >
          {gallery.videos && gallery.videos.map((video: JMVVideo) => {
            return (
              <Box 
                key={video.hash}
                px="5"
                mb="5"
                alignItems="center"
                // flex={1}
              >
                <AspectRatio height={100} ratio={{
                  base: 4 / 3,
                  md: 4 / 3
                }}>
                  <Box w="full" bg="black" mb="2" borderRadius="10" overflow="hidden">
                    <TouchableOpacity activeOpacity={0.8} onPress={() => handleVideoClick(video)}>
                      {renderThumbnail(video)}
                    </TouchableOpacity>
                  </Box>
                </AspectRatio>
                <Text 
                  color="white"
                  fontSize="sm"
                  fontWeight="bold"
                  w="32"
                  numberOfLines={1}
                >{video.name}</Text>
              </Box>
            );
          })}
        </Flex>
      </ScrollView>
    );
  }

  return (
    <ImageBackground source={background} style={styles.background}>
      <VStack safeArea flex={1}>
        <HStack
          justifyContent="space-between" 
          alignItems="center" 
          w="100%"
        >
          <IconButton 
            icon={<FontAwesomeIcon size={22} icon={faChevronLeft} color="#ffffff" />}
            onPress={onClickBack}
          />
        </HStack>

        <HStack justifyContent="center" alignItems="center">
          <Text 
            color="white"
            fontWeight="black"
            fontSize="2xl"
          >{gallery.name}</Text>
        </HStack>

        {renderVideos()}
      </VStack>
    </ImageBackground>
  );
}
