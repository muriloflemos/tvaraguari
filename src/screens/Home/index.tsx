import React from 'react';
import { VStack, HStack, Image, useTheme, Heading } from 'native-base';
import { ImageBackground, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import Share from 'react-native-share';

import background from '../../assets/images/background.png';
import logoHome from '../../assets/images/logo-home.png';
import botaoAoVivo from '../../assets/images/botao-ao-vivo.png';
import iconeSite from '../../assets/images/icone-site.png';
import iconeFacebook from '../../assets/images/icone-facebook.png';
import iconeInstagram from '../../assets/images/icone-instagram.png';
import iconeShare from '../../assets/images/icone-share.png';

import { openWebsite, openFacebook, openInstagram } from '../../utils';
import { APPLE_URL, GOOGLE_URL } from '../../config';

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  btnAoVivo: {
    marginTop: 70,
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export function Home({ navigation }: any) {
  const { colors } = useTheme();

  function toggleDrawer(): void {
    navigation.toggleDrawer();
  }

  function openTV() {
    navigation.navigate('TV')
  }

  async function share() {
    const url = Platform.OS == 'ios' ? APPLE_URL : GOOGLE_URL;
    const message = `Baixe o app da TV Araguari ${url}`;
    const shareOptions = {
      title: 'Compartilhar',
      message: message,
    };
    try {
      await Share.open(shareOptions);
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <ImageBackground source={background} style={styles.background}>
      <VStack 
        flex={1} 
        alignItems="center" 
        justifyContent="flex-start"
      >
        <VStack
          h="85%"
          w="full"
          alignItems="center"
          justifyContent="center"
        >
          <VStack position="absolute" top="0" left="0" safeArea ml="5" mt="5">
            <TouchableOpacity activeOpacity={0.8} onPress={toggleDrawer}>
              <FontAwesomeIcon icon={ faBars } color={colors.white} size={22} />
            </TouchableOpacity>
          </VStack>
          <Image source={logoHome} alt="logo" />
          <TouchableOpacity activeOpacity={0.8} style={styles.btnAoVivo} onPress={openTV}>
            <Image source={botaoAoVivo} alt="btn-ao-vivo" />
          </TouchableOpacity>
        </VStack>
        <HStack 
          h="10%" 
          w="90%"
          alignItems="center"
          justifyContent="space-around"
        >
          <TouchableOpacity activeOpacity={0.8} style={styles.icon} onPress={openWebsite}>
            <Image source={iconeSite} alt="icone-site" w="12" height="12" />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} style={styles.icon} onPress={openFacebook}>
            <Image source={iconeFacebook} alt="icone-facebook" w="12" height="12" />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} style={styles.icon} onPress={openInstagram}>
            <Image source={iconeInstagram} alt="icone-instagram" w="12" height="12" />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} style={styles.icon} onPress={share}>
            <Image source={iconeShare} alt="icone-share" w="12" height="12" />
          </TouchableOpacity>
        </HStack>
      </VStack>
    </ImageBackground>
  );
}
