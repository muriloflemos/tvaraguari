import React, { useEffect, useState } from 'react';
import { VStack, HStack, IconButton } from 'native-base';
import { StyleSheet, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import { TV_URL } from '../../config';

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: '#000',
  },
  webview: {
    backgroundColor: '#000'
  },
  webviewContainer: {
    backgroundColor: '#000',
  },
});

export function TV({ navigation }: any) {
  const [url, setUrl] = useState('');

  useEffect(() => {
    setUrl(TV_URL);
  }, []);

  function onClickBack() {
    navigation.goBack();
  }

  function renderWebView() {
    if (!url) return;
    return (
      <WebView
        style={styles.webview}
        originWhitelist={['*']}
        source={{ uri: url }}
      />
    );
  }

  return (
    <SafeAreaView style={styles.area}>
      <VStack flex={1} bg="black">
        <HStack
          bg="black" 
          px="1" 
          py="3" 
          justifyContent="space-between" 
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
    </SafeAreaView>
  );
}
