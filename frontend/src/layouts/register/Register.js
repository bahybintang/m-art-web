import { Box, Heading, Text, useColorModeValue } from '@chakra-ui/react';
import * as React from 'react';
import { Card } from './Card';
import { Link } from './Link';
import { RegisterForm } from './RegisterForm';
import { Logo } from './Logo';

function Register() {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'inherit')}
      minH="100vh"
      py="12"
      px={{ base: '4', lg: '8' }}
    >
      <Box maxW="md" mx="auto">
        <Logo mx="auto" h="8" mb={{ base: '10', md: '20' }} />
        <Heading textAlign="center" size="xl" fontWeight="extrabold">
          Create your account
        </Heading>
        <Text mt="4" mb="8" align="center" maxW="md" fontWeight="medium">
          <Text as="span">Do you have an account?</Text>
          <Link href="login">Sign in</Link>
        </Text>
        <Card>
          <RegisterForm />
        </Card>
      </Box>
    </Box>
  );
}

export default Register;
