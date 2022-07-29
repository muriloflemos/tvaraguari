import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { House, Monitor, Browser } from 'phosphor-react-native';

import { AppDrawer } from '../components/AppDrawer';
import { Home } from '../screens/Home';
import { TV } from '../screens/TV';

const { Navigator, Screen } = createDrawerNavigator();

export function AppRoutes() {
  return (
    <Navigator 
      useLegacyImplementation={true} 
      drawerContent={props => <AppDrawer {...props} />}
      screenOptions={{ 
        headerShown: false,
        drawerActiveBackgroundColor: '#dddddd',
        drawerActiveTintColor: '#000',
        drawerType: 'front',
        swipeEnabled: false,
      }}
    >
      <Screen 
        name="Home" 
        component={Home}
        options={{
          drawerIcon: ({color}) => (
            <House size={22} color={color} />
          ),
        }}
      />
      <Screen
        name="TV"
        component={TV}
        options={{
          drawerIcon: ({color}) => (
            <Monitor size={22} color={color} />
          ),
        }}
      />
      <Screen
        name="Nosso Site"
        component={TV}
        options={{
          drawerIcon: ({color}) => (
            <Browser size={22} color={color} />
          ),
        }}
      />
    </Navigator>
  );
}
