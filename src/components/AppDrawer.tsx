import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { Image, View, AspectRatio, Text } from 'native-base';
import { DrawerItem } from '@react-navigation/drawer';
import { WhatsappLogo, FacebookLogo, InstagramLogo, ShieldCheck } from 'phosphor-react-native';

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
            icon={({ color }) => <WhatsappLogo size={22} color={color} />}
          />
          <DrawerItem
            label="Facebook"
            onPress={() => onDrawerItemPress('TV')}
            icon={({ color }) => <FacebookLogo size={22} color={color} />}
          />
          <DrawerItem
            label="Instagram"
            onPress={() => onDrawerItemPress('TV')}
            icon={({ color }) => <InstagramLogo size={22} color={color} />}
          />
          <View style={{ borderTopWidth: 1, borderTopColor: '#ccc', marginBottom: 20}}>
            <Text ml="5" mt="5" fontWeight="bold" fontSize="16" color="gray.300">Outros</Text>
            <DrawerItem
              label="Política de Privacidade"
              onPress={() => onDrawerItemPress('TV')}
              icon={({ color }) => <ShieldCheck size={22} color={color} />}
            />
          </View>
        </View>
      </DrawerContentScrollView>
    </View>
  );
};
