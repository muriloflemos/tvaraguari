import React from 'react';
import { Center, Spinner } from 'native-base';

const Loading = () => {
  return (
    <Center flex={1} width="100%">
      <Spinner size="lg" color={'#FFFFFF'} />
    </Center>
  );
};

export default Loading;