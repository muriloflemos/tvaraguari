import React from 'react';
import { NativeBaseProvider, StatusBar } from "native-base";
import FlashMessage from "react-native-flash-message";

import { THEME } from './src/styles/themes';
import { Routes } from './src/routes';

const App = () => {
  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Routes />
      <FlashMessage position="top" />
    </NativeBaseProvider>
  );
};

export default App;
