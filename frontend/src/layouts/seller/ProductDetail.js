import { ProductForm } from './ProductForm';
import { Box, Heading, Text, useColorModeValue } from '@chakra-ui/react';
import { Card } from './Card';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProductById } from '../../helpers/Api';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  useEffect(() => {
    (async function () {
      const data = await getProductById(id);
      setProduct(data);
      console.log(data);
    })();
  }, [id]);

  return (
    <Box
      bg={useColorModeValue('gray.50', 'inherit')}
      minH="100vh"
      py="12"
      px={{ base: '4', lg: '8' }}
    >
      <Box maxW="md" mx="auto">
        <Heading textAlign="center" size="xl" fontWeight="extrabold">
          Detail Produk
        </Heading>
        <Card>
          <ProductForm />
        </Card>
      </Box>
    </Box>
  );
}

export default ProductDetail;
