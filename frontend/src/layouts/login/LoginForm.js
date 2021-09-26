import {
  Button,
  chakra,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useToast,
} from '@chakra-ui/react';
import React from 'react';
import { PasswordField } from './PasswordField';
import { doLogin, getUserData } from '../../helpers/Auth';

export const LoginForm = props => {
  const toast = useToast();
  return (
    <chakra.form
      onSubmit={async e => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[2].value;
        const result = await doLogin(email, password);
        if (result === true) {
          window.location = getUserData().eCommerceRole;
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
        <PasswordField />
        <Button type="submit" colorScheme="blue" size="lg" fontSize="md">
          Sign in
        </Button>
      </Stack>
    </chakra.form>
  );
};
