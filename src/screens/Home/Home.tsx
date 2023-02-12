import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, RefreshControl, ImageBackground } from 'react-native';
import { VStack, HStack, Text, Center } from 'native-base';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faRotate } from '@fortawesome/free-solid-svg-icons';

import Loading from '../../components/Loading';
import { CardAoVivo } from './CardAoVivo';
import { VideoCard } from './VideoCard';
import { BtnYoutube } from './BtnYoutube';

// import background from '../../assets/images/bg.png';
import background from '../../assets/images/bg.jpg';
// import background from '../../assets/images/bg-azul.jpg';

import { TV_URL } from '../../config';
import { openYoutube } from '../../utils';
import { getData, Programa, Gravacao, Video, APIResponse } from '../../services/APIService';

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  margin: {
    margin: 25,
  }
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
        <TouchableOpacity activeOpacity={0.8} onPress={() => openTV()} style={styles.margin}>
          <CardAoVivo programa={{
            id: 1,
            name: 'Ao vivo',
            thumbnail: 'https://s3.sa-east-1.amazonaws.com/tvaraguari.tv.br/public/capas/tv-araguari.png',
          }}></CardAoVivo>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity activeOpacity={0.8} onPress={() => openTV()} style={styles.margin}>
        <CardAoVivo programa={programa}></CardAoVivo>
      </TouchableOpacity>
    );
  }

  function renderHeader() {
    return (
      <>
        {renderCardAoVivo()}
        <TouchableOpacity 
          activeOpacity={0.8} 
          onPress={() => openYoutube()} 
          style={{...styles.margin, marginTop: 0}}
        >
          <BtnYoutube></BtnYoutube>
        </TouchableOpacity>
      </>
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
        data={gravados}
        renderItem={({ item }) => renderItem(item)}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={renderHeader}
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

  return (
    <ImageBackground source={background} style={styles.background}>
      {!loaded ? renderLoading() : render()}
    </ImageBackground>
  );
}
