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
import { doRegister, getUserData } from '../../helpers/Auth';

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

export const ProfileForm = props => {
  const userData = getUserData();
  const toast = useToast();
  const options = ['Seller', 'Customer'];
  const [role, setRole] = useState('Customer');
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'framework',
    defaultValue: toTitleCase(userData.eCommerceRole),
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

        // Not implemented
        // const result = await doRegister(email, username, password, role);
        // if (result === true) {
        //   window.location = '/login';
        // } else {
        //   toast({
        //     title: 'Login failed',
        //     description: result,
        //     status: 'warning',
        //     duration: 3000,
        //     isClosable: true,
        //   });
        // }
      }}
      {...props}
    >
      <Stack spacing="6">
        <FormControl id="email">
          <FormLabel>Email address</FormLabel>
          <Input
            name="email"
            placeholder={userData.email}
            type="email"
            autoComplete="email"
            required
          />
        </FormControl>
        <FormControl id="username">
          <FormLabel>Username</FormLabel>
          <Input
            name="username"
            placeholder={userData.username}
            type="text"
            autoComplete="username"
            required
          />
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
          Save
        </Button>
      </Stack>
    </chakra.form>
  );
};
