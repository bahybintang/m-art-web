import {
  Button,
  chakra,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useRadioGroup,
  useToast,
  Textarea,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { doRegister, getUserData } from '../../helpers/Auth';

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

export const ProductForm = props => {
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
        <FormControl id="product-name">
          <FormLabel>Product Name</FormLabel>
          <Input
            name="product-name"
            placeholder="Product Name"
            type="text"
            autoComplete="product-name"
            required
          />
        </FormControl>
        <FormControl id="description">
          <FormLabel>Description</FormLabel>
          <Textarea placeholder="Description" />
        </FormControl>
        <FormControl id="Stock">
        <FormLabel>Stock</FormLabel>
        <NumberInput
          defaultValue={0}
          keepWithinRange={false}
          clampValueOnBlur={false}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>      
        </FormControl>      
        <FormControl id="Price">
        <FormLabel>Price</FormLabel>
        <NumberInput
          defaultValue={0}
          keepWithinRange={false}
          clampValueOnBlur={false}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>      
        </FormControl>   
        <Button type="submit" colorScheme="blue" size="lg" fontSize="md">
          Save
        </Button>
      </Stack>
    </chakra.form>
  );
};
