import React from 'react';
import { Input as AppInput, IInputProps } from 'native-base';

export const Input = ({ ...props }: IInputProps) => {
  return (
    <AppInput
      bg="gray.700"
      h={14}
      size="md"
      borderWidth={0}
      fontSize="md"
      fontFamily="body"
      color="white"
      placeholderTextColor="gray.300"
      _focus={{
        borderWidth: 1,
        borderColor: "green.100",
        bg: "gray.700"
      }}
      {...props}
    />
  );
}
