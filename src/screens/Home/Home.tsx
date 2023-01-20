import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { VStack, useTheme, HStack, Text, Center } from 'native-base';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft, faPlayCircle, faRotate } from '@fortawesome/free-solid-svg-icons';

import Loading from '../../components/Loading';
import { CardAoVivo } from './CardAoVivo';
import { VideoCard } from './VideoCard';

import { openWebsite, openFacebook, openInstagram } from '../../utils';
import { TV_URL } from '../../config';
import { getData, Programa, Gravacao, Video, APIResponse } from '../../services/APIService';

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#1B1B1B',
  },
});

export function Home({ navigation }: any) {
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [programa, setPrograma] = useState<Programa | null>(null);
  const [gravados, setGravados] = useState<Gravacao[]>([]);

  useEffect(() => {
    load();
  }, []);

  function load() {
    setLoading(true);
    getData().then((response: APIResponse) => {
      const { gravados, programacao } = response;
      if (gravados && programacao) {
        setError(false);
        setPrograma(programacao);
        setGravados(gravados);
      } else {
        setPrograma(null);
        setGravados([]);
        setError(true);
      }
    }).catch(() => {
      setPrograma(null);
      setGravados([]);
      setError(true);
    }).finally(() => {
      setLoaded(true);
      setLoading(false);
    });
  }

  function openTV() {
    navigation.navigate('TV', { url: TV_URL })
  }

  function renderLoading() {
    return (
      <VStack flex={1} style={styles.background}>
        <Loading />
      </VStack>
    )
  }

  function renderError() {
    return (
      <VStack 
        flex={1} 
        style={styles.background}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Center w={300}>
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
      </VStack>
    );
  }

  function renderCardAoVivo() {
    if (!programa) {
      return (
        <TouchableOpacity activeOpacity={0.8} onPress={() => openTV()}>
          <CardAoVivo programa={{
            id: 1,
            name: 'Ao vivo',
            thumbnail: 'https://s3.sa-east-1.amazonaws.com/tvaraguari.tv.br/public/capas/tv-araguari.png',
          }}></CardAoVivo>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity activeOpacity={0.8} onPress={() => openTV()}>
        <CardAoVivo programa={programa}></CardAoVivo>
      </TouchableOpacity>
    );
  }

  function renderItem(item: Gravacao) {
    return (
      <VStack
        marginX={7}
        paddingBottom={3}
      >
        <Text 
          color={'white'} 
          fontSize={14}
          fontWeight={'bold'}
          textTransform={'uppercase'}
        >{item.name}</Text>
        {renderVideos(item.videos)}
      </VStack>
    );
  }

  function handleVideoClick(video: Video) {
    navigation.navigate('TV', { url: video.playerSource });
  }

  function renderVideos(videos: Video[]) {
    return (
      <FlatList
        data={videos}
        horizontal={true}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity activeOpacity={0.8} onPress={() => handleVideoClick(item)}>
              <VideoCard video={item}/>
            </TouchableOpacity>
          );
        }}
        keyExtractor={item => item.hash}
      />
    );
  }

  function render() {
    return (
      <FlatList
        style={styles.background}
        data={gravados}
        renderItem={({ item }) => renderItem(item)}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={renderCardAoVivo}
        ListFooterComponent={() => {
          if (error) return renderError();
          return null;
        }}
        refreshControl={
          <RefreshControl
            enabled={true}
            refreshing={loading}
            onRefresh={load}
            tintColor={'#FFFFFF'}
          />
        }
      />
    );
  }

  return !loaded ? renderLoading() : render();
}
