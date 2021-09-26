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
import { PasswordField } from './PasswordField';
import RadioCard from './RadioCard';
import { doLogin, getUserData } from '../../helpers/Auth';

export const LoginForm = props => {
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
        const password = e.target[2].value;
        if ((await doLogin(email, password)) === true) {
          window.location = getUserData().eCommerceRole;
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
