import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { Image, View, AspectRatio, Text } from 'native-base';
import { DrawerItem } from '@react-navigation/drawer';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faFacebookSquare, faInstagramSquare, faWhatsappSquare } from '@fortawesome/free-brands-svg-icons'
import { faFileShield } from '@fortawesome/free-solid-svg-icons'

import logo from '../assets/images/logo-horizontal.png';

export const AppDrawer = (props: any) => {
  function onDrawerItemPress(opt: string) {
    console.log(opt)
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#000000' }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: '#000000'}}
      >
        <View padding="5" mb="2">
          <AspectRatio ratio={{ base: 250 / 67 }}>
            <Image
              source={logo}
              alt="logo"
              mb="5"
              w="full"
              resizeMode='contain'
            />
          </AspectRatio>
        </View>
        <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>
          <DrawerItemList {...props} />
          <DrawerItem 
            label="Whatsapp" 
            onPress={() => onDrawerItemPress('TV')}
            icon={({ color }) => <FontAwesomeIcon icon={ faWhatsappSquare } color={color} size={22} />}            
          />
          <DrawerItem
            label="Facebook"
            onPress={() => onDrawerItemPress('TV')}
            icon={({ color }) => <FontAwesomeIcon icon={ faFacebookSquare } color={color} size={22} />}
          />
          <DrawerItem
            label="Instagram"
            onPress={() => onDrawerItemPress('TV')}
            icon={({ color }) => <FontAwesomeIcon icon={ faInstagramSquare } color={color} size={22} />}
          />
          <View style={{ borderTopWidth: 1, borderTopColor: '#ccc', marginBottom: 20}}>
            <Text ml="5" mt="5" fontWeight="bold" fontSize="16" color="gray.300">Outros</Text>
            <DrawerItem
              label="Política de Privacidade"
              onPress={() => onDrawerItemPress('TV')}              
              icon={({ color }) => <FontAwesomeIcon icon={ faFileShield } color={color} size={22} />}
            />
          </View>
        </View>
      </DrawerContentScrollView>
    </View>
  );
};
