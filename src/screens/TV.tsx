import React, { useEffect, useState } from 'react';
import { VStack, HStack, Text, IconButton } from 'native-base';
import { StyleSheet, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import { TV_URL } from '../config';

const styles = StyleSheet.create({
  webview: {
    backgroundColor: '#000'
  },
  webviewContainer: {
    backgroundColor: '#000',
  },
});

export function TV({ navigation }: any) {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    setTitle('AO VIVO');
    setUrl(TV_URL);
  }, []);

  function onClickBack() {
    navigation.goBack();
  }

  function renderWebView() {
    return (
      <WebView
        style={styles.webview}
        originWhitelist={['*']}
        source={{ uri: url }}
        allowsFullscreenVideo
      />
    );
  }

  return (
    <VStack safeArea flex={1} bg="black">
      <HStack
        bg="black"
        justifyContent="flex-start" 
        alignItems="center" 
        w="100%"
      >
        <IconButton 
          icon={<FontAwesomeIcon size={22} icon={faChevronLeft} color="#ffffff" />}
          onPress={onClickBack}
        />
      </HStack>
      {renderWebView()}
    </VStack>
  );
}
