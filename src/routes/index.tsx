import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RNBootSplash from "react-native-bootsplash";

import { AppRoutes } from './app.routes';

export function Routes() {
  async function onReadyCallback() {
    try {
      await RNBootSplash.hide();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <NavigationContainer onReady={onReadyCallback}>
      <AppRoutes />
    </NavigationContainer>
  );
}
