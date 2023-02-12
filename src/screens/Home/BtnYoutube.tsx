import React from 'react';
import { HStack, Text } from 'native-base';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';

import { PRIMARY_COLOR } from '../../config';

export function BtnYoutube() {
  return (
    <HStack
      alignItems={'center'}
      justifyContent={'center'}
      backgroundColor={PRIMARY_COLOR}
      padding={3}
      borderRadius={3}
    >
      <FontAwesomeIcon icon={faYoutube} size={25} color='white' />
      <Text
        color={'white'}
        fontSize={16}
        fontWeight={'bold'}
        marginLeft={3}
      >JORNALISMO GRAVADO</Text>
    </HStack>
  );
}