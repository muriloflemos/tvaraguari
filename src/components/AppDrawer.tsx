import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { Image, View, AspectRatio, Text } from 'native-base';
import { DrawerItem } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faFacebookSquare, faInstagramSquare, faWhatsappSquare } from '@fortawesome/free-brands-svg-icons'
import { faFileShield, faTv, faGlobe, faCirclePlay } from '@fortawesome/free-solid-svg-icons'

import logo from '../assets/images/logo-horizontal.png';
import { openWebsite, openFacebook, openInstagram, openWhatsapp } from '../utils';
import { TV_URL } from '../config';

enum DrawerOption {
  TV = 0,
  SITE = 1,
  WHATSAPP = 2,
  FACEBOOK = 3,
  INSTAGRAM = 4,
  POLITICA = 5,
  ON_DEMAND = 6,
}

export const AppDrawer = (props: any) => {
  const navigation = useNavigation();

  function onDrawerItemPress(opt: DrawerOption) {
    switch (opt) {
      case DrawerOption.TV:
        openTV();
        break;
      case DrawerOption.ON_DEMAND:
        openOnDemand();
        break;
      case DrawerOption.SITE:
        openWebsite();
        break;
      case DrawerOption.WHATSAPP:
        openWhatsapp();
        break;
      case DrawerOption.FACEBOOK:
        openFacebook();
        break;
      case DrawerOption.INSTAGRAM:
        openInstagram();
        break;
    }
  }

  function openTV() {
    navigation.navigate('TV', { url: TV_URL });
  }

  function openOnDemand() {
    navigation.navigate('OnDemand');
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
            label="TV" 
            onPress={() => onDrawerItemPress(DrawerOption.TV)}
            icon={({ color }) => <FontAwesomeIcon icon={ faTv } color={color} size={22} />}            
          />
          <DrawerItem 
            label="Gravados"
            onPress={() => onDrawerItemPress(DrawerOption.ON_DEMAND)}
            icon={({ color }) => <FontAwesomeIcon icon={ faCirclePlay } color={color} size={22} />}            
          />
          <DrawerItem 
            label="Site"
            onPress={() => onDrawerItemPress(DrawerOption.SITE)}
            icon={({ color }) => <FontAwesomeIcon icon={ faGlobe } color={color} size={22} />}            
          />
          <DrawerItem 
            label="Whatsapp" 
            onPress={() => onDrawerItemPress(DrawerOption.WHATSAPP)}
            icon={({ color }) => <FontAwesomeIcon icon={ faWhatsappSquare } color={color} size={22} />}            
          />
          <DrawerItem
            label="Facebook"
            onPress={() => onDrawerItemPress(DrawerOption.FACEBOOK)}
            icon={({ color }) => <FontAwesomeIcon icon={ faFacebookSquare } color={color} size={22} />}
          />
          <DrawerItem
            label="Instagram"
            onPress={() => onDrawerItemPress(DrawerOption.INSTAGRAM)}
            icon={({ color }) => <FontAwesomeIcon icon={ faInstagramSquare } color={color} size={22} />}
          />
          {/* <View style={{ borderTopWidth: 1, borderTopColor: '#ccc', marginBottom: 20}}>
            <Text ml="5" mt="5" fontWeight="bold" fontSize="16" color="gray.300">Outros</Text>
            <DrawerItem
              label="Política de Privacidade"
              onPress={() => onDrawerItemPress(DrawerOption.POLITICA)}
              icon={({ color }) => <FontAwesomeIcon icon={ faFileShield } color={color} size={22} />}
            />
          </View> */}
        </View>
      </DrawerContentScrollView>
    </View>
  );
};
