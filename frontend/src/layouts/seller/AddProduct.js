import { ProfileForm } from './ProfileForm';
import { Box, Heading, Text, useColorModeValue } from '@chakra-ui/react';
import { Card } from './Card';

function AddProduct() {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'inherit')}
      minH="100vh"
      py="12"
      px={{ base: '4', lg: '8' }}
    >
      <Box maxW="md" mx="auto">
        <Heading textAlign="center" size="xl" fontWeight="extrabold">
          Akun Anda
        </Heading>
        <Card>
          <ProfileForm />
        </Card>
      </Box>
    </Box>
  );
}

export default AddProduct;
