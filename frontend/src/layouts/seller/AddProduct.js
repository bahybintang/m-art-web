import { ProductForm } from './ProductForm';
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
          Tambah Produk
        </Heading>
        <Card>
          <ProductForm />
        </Card>
      </Box>
    </Box>
  );
}

export default AddProduct;
