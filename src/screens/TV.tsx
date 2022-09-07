import React from 'react';
import { VStack, HStack, IconButton } from 'native-base';
import { WebView } from 'react-native-webview';
import { NativeModules } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const { PictureInPicture } = NativeModules;
type Message = { nativeEvent: { data: string; }; };
const onMessage = (event: Message) => {
  if (event.nativeEvent.data === 'enter-pip-mode') {
    PictureInPicture.start();
  }
};

export function TV({ route, navigation }: any) {
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
        mixedContentMode="compatibility"
        contentMode="mobile"
        originWhitelist={['*']}
        javaScriptEnabled
        onMessage={onMessage}
        source={{ uri: url }}
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
