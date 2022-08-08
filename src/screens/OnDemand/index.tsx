import React from 'react';
import { VStack, HStack, IconButton, Text } from 'native-base';
import { StyleSheet, ImageBackground } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import background from '../../assets/images/background.png';

const styles = StyleSheet.create({
  background: {
    flex: 1,
  }
});

export const OnDemand = ({ navigation }: any) => {
  const onClickBack = () => {
    navigation.goBack();
  }

  return (
    <ImageBackground source={background} style={styles.background}>
      <VStack safeArea flex={1}>
        <HStack
          px="1" 
          py="3" 
          justifyContent="space-between" 
          alignItems="center" 
          w="100%"
        >
          <IconButton 
            icon={<FontAwesomeIcon size={22} icon={faChevronLeft} color="#ffffff" />}
            onPress={onClickBack}
          />
        </HStack>

        <HStack justifyContent="center" alignItems="center">
          <Text 
            color="white"
            fontWeight="black"
            fontSize="2xl"
          >PROGRAMAS</Text>
        </HStack>
      </VStack>
    </ImageBackground>
  );
};
