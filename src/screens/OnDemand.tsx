import React, { useEffect, useState } from 'react';
import { VStack, HStack, IconButton, Text, ScrollView, Flex, Box, Center, Image, AspectRatio, Button } from 'native-base';
import { StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft, faPlayCircle, faRotate } from '@fortawesome/free-solid-svg-icons';

import { listGalleries, JMVGallery, JMVVideo } from '../services/JMVService';
import Loading from '../components/Loading';

import background from '../assets/images/background.png';

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  thumbnailIcon: {
    position: 'absolute',
  }
});

export const OnDemand = ({ navigation }: any) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [galleries, setGalleries] = useState<JMVGallery[]>([]);

  useEffect(() => {
    load();
  }, []);

  const onClickBack = () => {
    navigation.goBack();
  }

  function load() {
    listGalleries().then((galleries: JMVGallery[]) => {
      if (galleries.length > 0) {
        setError(false);
        setGalleries(galleries);
      } else {
        setError(true);
      }
    }).catch(() => {
      setError(true);
    }).finally(() => {
      setLoading(false);
    });
  }

  function renderError() {
    return (
      <Center flex={1}>
        <Text 
          w="70%" 
          textAlign="center"
          color="white"
          fontSize="md"
          fontWeight="bold"
          mb="3"
        >Não foi possível buscar a programação, tente novamente em alguns instantes!</Text>
        <TouchableOpacity activeOpacity={0.8} onPress={() => load()}>
          <HStack 
            alignItems="center" 
            justifyContent="center"
            bg="white"
            borderRadius="5"
            px="3"
            py="2"
          >
            <FontAwesomeIcon size={15} icon={faRotate} color="#000000" />
            <Text color="black" ml="2" fontSize="md">Tentar novamente</Text>
          </HStack>
        </TouchableOpacity>
      </Center>
    );
  }

  function renderThumbnail(videos: JMVVideo[]) {
    if (videos.length == 0) return renderPlaceholder();
    const video = videos[0];
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

  function renderPlaceholder() {
    return (
      <Center flex="1">
        <FontAwesomeIcon size={35} icon={faPlayCircle} color="#ffffff" />
      </Center>
    );
  }

  function handleGalleryClick(gallery: JMVGallery) {
    navigation.navigate('Videos', { gallery });
  }

  function renderGalleries() {
    if (error) return renderError();
    
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
          {galleries.map((gallery) => {
            return (
              <Box 
                key={gallery.id}
                px="5"
                mb="5"
                alignItems="center"
              >
                <AspectRatio height={100} ratio={{
                  base: 4 / 3,
                  md: 4 / 3
                }}>
                  <Box w="full" bg="black" mb="2" borderRadius="10" overflow="hidden">
                    <TouchableOpacity activeOpacity={0.8} onPress={() => handleGalleryClick(gallery)}>
                      {renderThumbnail(gallery.videos)}
                    </TouchableOpacity>
                  </Box>
                </AspectRatio>
                <Text 
                  color="white"
                  fontSize="sm"
                  fontWeight="bold"
                >{gallery.name}</Text>
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
          >PROGRAMAS</Text>
        </HStack>

        {loading ? <Loading /> : renderGalleries()}
      </VStack>
    </ImageBackground>
  );
};
