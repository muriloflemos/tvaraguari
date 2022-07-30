import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHouse, faTv, faGlobe } from '@fortawesome/free-solid-svg-icons'

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
        // swipeEnabled: false,
      }}
    >
      <Screen 
        name="Home" 
        component={Home}
        options={{
          drawerIcon: ({color}) => (
            <FontAwesomeIcon icon={ faHouse } color={color} size={22} />
          ),
        }}
      />
      <Screen
        name="TV"
        component={TV}
        options={{
          drawerIcon: ({color}) => (
            <FontAwesomeIcon icon={ faTv } color={color} size={22} />
          ),
        }}
      />
      <Screen
        name="Nosso Site"
        component={TV}
        options={{
          drawerIcon: ({color}) => (
            <FontAwesomeIcon icon={ faGlobe } color={color} size={22} />
          ),
        }}
      />
    </Navigator>
  );
}
