import React from 'react';
import {
  Container,
  Heading,
  InputGroup,
  InputLeftAddon,
  Input,
  InputRightElement,
  RadioGroup,
  Radio,
  Button,
} from '@chakra-ui/react';
import { CopyIcon } from '@chakra-ui/icons';
const Login = () => (
  <Container>
    <Heading>Login</Heading>
    <InputGroup>
      <InputLeftAddon>Email</InputLeftAddon>
      <Input />
      <InputRightElement>
        <CopyIcon name="email" />
      </InputRightElement>
    </InputGroup>
    <InputGroup>
      <InputLeftAddon>Password</InputLeftAddon>
      <Input size="sm" />
    </InputGroup>
    <RadioGroup>
      <Radio>Radio</Radio>
      <Radio>Radio</Radio>
    </RadioGroup>
    <Button
      variant="solid"
      size="md"
      display="flex"
      justifyContent="center"
      flexDirection="row"
      alignItems="center"
    >
      Login
    </Button>
  </Container>
);
export default Login;
