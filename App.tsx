import React, { useState, useEffect } from 'react';
import { NativeBaseProvider, StatusBar } from "native-base";

import { THEME } from './src/styles/themes';
import Loading from './src/components/Loading';
import { Routes } from './src/routes';

const App = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 1000);
  }, []);

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      { loaded ? <Routes /> : <Loading /> }
    </NativeBaseProvider>
  );
};

export default App;
