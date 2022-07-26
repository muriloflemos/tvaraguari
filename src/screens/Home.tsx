import React, { useState, useEffect } from 'react';
import { VStack, Heading, Icon, useTheme } from 'native-base';
import { Envelope, Key } from 'phosphor-react-native';

import Logo from '../assets/images/logo_primary.svg';

import { Input } from '../components/Input';
import { Button } from '../components/Button';

export function Home() {
  const { colors } = useTheme();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  return (
    <VStack 
      flex={1} 
      alignItems="center" 
      bg="gray.600" 
      px={8} 
      pt={24}
    >
      <Logo />
      <Heading 
        color="gray.100" 
        fontSize="xl" 
        fontWeight={500} 
        mt={20}
        mb={10}
      >Acesse sua conta</Heading>
      <Input 
        placeholder="E-mail" 
        mb={4} 
        onChangeText={setName}
        InputLeftElement={<Icon as={<Envelope color={colors.gray[300]} />} ml={4} />} 
      />
      <Input
        placeholder="Senha"
        secureTextEntry
        mb={4}
        onChangeText={setPassword}
        InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />} 
      />

      <Button title="Entrar" w="full" />
    </VStack>
  );
}
