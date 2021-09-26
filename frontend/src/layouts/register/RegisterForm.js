import {
  Button,
  chakra,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useRadioGroup,
  HStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { PasswordConfirmationField } from './PasswordConfirmationField';
import { PasswordField } from './PasswordField';
import RadioCard from './RadioCard';

export const RegisterForm = props => {
  const options = ['Seller', 'Buyer'];
  const [role, setRole] = useState('Buyer');
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'framework',
    defaultValue: 'Buyer',
    onChange: setRole,
  });

  const group = getRootProps();
  return (
    <chakra.form
      onSubmit={e => {
        e.preventDefault();
        const email = e.target[0].value;
        const username = e.target[1].value;
        const password = e.target[3].value;
        const password_confrimation = e.target[5].value;
        console.log(email, username, password, password_confrimation, role);
      }}
      {...props}
    >
      <Stack spacing="6">
        <FormControl id="email">
          <FormLabel>Email address</FormLabel>
          <Input name="email" type="email" autoComplete="email" required />
        </FormControl>
        <FormControl id="username">
          <FormLabel>Username</FormLabel>
          <Input name="username" type="text" autoComplete="username" required />
        </FormControl>
        <PasswordField />
        <PasswordConfirmationField />
        <HStack {...group}>
          {options.map(value => {
            const radio = getRadioProps({ value });
            return (
              <RadioCard key={value} {...radio}>
                {value}
              </RadioCard>
            );
          })}
        </HStack>
        <Button type="submit" colorScheme="blue" size="lg" fontSize="md">
          Sign in
        </Button>
      </Stack>
    </chakra.form>
  );
};
