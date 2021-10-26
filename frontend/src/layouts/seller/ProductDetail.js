import { ShowProduct } from './ShowProduct';
import { Box, Heading, Text, useColorModeValue } from '@chakra-ui/react';
import { Card } from './Card';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProductById, addClickProductTracker } from '../../helpers/Api';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState({
    product_name: '',
    price: 0,
    stock: 0,
    description: '',
    seller: {
      username: '',
    },
    photos: [
      {
        formats: {
          thumbnail: {
            url: '/assets/images/logo_login.png',
          },
        },
      },
    ],
  });
  useEffect(() => {
    (async function () {
      const data = await getProductById(id);
      addClickProductTracker(id);
      setProduct(data);
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
          <ShowProduct product={product} />
        </Card>
      </Box>
    </Box>
  );
}

export default ProductDetail;
