import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHouse, faGlobe } from '@fortawesome/free-solid-svg-icons'

import { AppDrawer } from '../components/AppDrawer';
import { AppTabBar } from '../components/AppTabBar';
import { Home } from '../screens/Home';
import { TV } from '../screens/TV';
import { OnDemand } from '../screens/OnDemand';
import { Videos } from '../screens/Videos';

import { PRIMARY_COLOR } from '../config';
import { LogoHeader } from '../components/LogoHeader';

const { Navigator, Screen } = createDrawerNavigator();

const Tab = createBottomTabNavigator();
function Main() {
  return (
    <Tab.Navigator tabBar={() => <AppTabBar />}>
      <Tab.Screen
        name="Main"
        component={Home}
        options={{
          title: 'Home',
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

const HomeStack = createNativeStackNavigator();
const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStack.Screen
        name="Home"
        component={Main}
        options={{ 
          orientation: 'portrait',
          headerShown: true,
          headerStyle: {
            backgroundColor: PRIMARY_COLOR,
          },
          headerTitleAlign: 'center',
          headerTitle: () => <LogoHeader />,
        }}
      />
      <HomeStack.Screen
        name="TV"
        component={TV}
        options={{
          orientation: 'landscape',
        }}
      />
      <HomeStack.Screen
        name="OnDemand"
        component={OnDemand}
        options={{
          orientation: 'portrait',
        }}
      />
      <HomeStack.Screen
        name="Videos"
        component={Videos}
        options={{
          orientation: 'portrait',
        }}
      />
    </HomeStack.Navigator>
  );
}

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
        name="HomeStack" 
        component={HomeStackScreen}
        options={{
          drawerLabel: 'Home',
          drawerIcon: ({color}) => (
            <FontAwesomeIcon icon={ faHouse } color={color} size={22} />
          ),
        }}
      />
    </Navigator>
  );
}
