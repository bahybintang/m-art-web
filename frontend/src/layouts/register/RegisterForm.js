import {
  Button,
  chakra,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useRadioGroup,
  HStack,
  useToast,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { PasswordConfirmationField } from './PasswordConfirmationField';
import { PasswordField } from './PasswordField';
import RadioCard from './RadioCard';
import { doRegister } from '../../helpers/Auth';

export const RegisterForm = props => {
  const toast = useToast();
  const options = ['Seller', 'Customer'];
  const [role, setRole] = useState('Customer');
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'framework',
    defaultValue: 'Customer',
    onChange: setRole,
  });

  const group = getRootProps();
  return (
    <chakra.form
      onSubmit={async e => {
        e.preventDefault();
        const email = e.target[0].value;
        const username = e.target[1].value;
        const password = e.target[3].value;
        // const password_confrimation = e.target[5].value;
        const result = await doRegister(email, username, password, role);
        if (result === true) {
          window.location = '/login';
        } else {
          toast({
            title: 'Login failed',
            description: result,
            status: 'warning',
            duration: 3000,
            isClosable: true,
          });
        }
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
          Register
        </Button>
      </Stack>
    </chakra.form>
  );
};
