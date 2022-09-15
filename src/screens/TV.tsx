import React from 'react';
import { VStack, HStack, IconButton } from 'native-base';
import { WebView } from 'react-native-webview';
import { StatusBar } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useKeepAwake } from '@sayem314/react-native-keep-awake';

export function TV({ route, navigation }: any) {
  useKeepAwake();
  const { url } = route.params;

  function onClickBack() {
    navigation.goBack();
  }

  function renderWebView() {
    if (!url) return;
    return (
      <WebView
        allowsFullscreenVideo
        allowsInlineMediaPlayback
        mediaPlaybackRequiresUserAction={false}
        ignoreSilentHardwareSwitch={true}
        mixedContentMode="compatibility"
        contentMode="mobile"
        originWhitelist={['*']}
        javaScriptEnabled
        cacheEnabled={false}
        cacheMode='LOAD_NO_CACHE'
        source={{ uri: url }}
      />
    );
  }

  return (
    <VStack safeArea flex={1} bg="black">
      <StatusBar
        barStyle="dark-content"
        hidden={true}
        backgroundColor="transparent"
        translucent
      />
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
