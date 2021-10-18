import {
  FormControl,
  FormLabel,
  Stack,
  Image,
  Center,
  Button,
  Input,
  useToast,
} from '@chakra-ui/react';
import Config from '../../config';
import { addToCart } from '../../helpers/AddToCart';
import { Card } from '../login/Card';
import { useState } from 'react';

export const ShowProduct = props => {
  const { product } = props;
  const photo = Config.API_URL + product.photos[0].formats.thumbnail.url;
  const seller = product.seller;
  const [qty, setQty] = useState(0);
  const toast = useToast();

  function doAddToCart(product, qty) {
    toast({
      title: 'Added to Cart!',
      status: 'info',
      duration: 2000,
      isClosable: true,
    });
    addToCart(product, qty);
  }

  return (
    <Card>
      <Stack spacing="6">
        <Center>
          <Image borderRadius="full" boxSize="150px" src={photo} />
        </Center>
        <FormControl id="product-name">
          <FormLabel>
            {' '}
            <b>Product Name</b> : {product.product_name}
          </FormLabel>
        </FormControl>
        <FormControl id="seller">
          <FormLabel>
            {' '}
            <b>Seller</b> : {seller ? seller.username : ''}
          </FormLabel>
        </FormControl>
        <FormControl id="description">
          <FormLabel>
            <b>Description</b>
          </FormLabel>
          <p>{product.description}</p>
        </FormControl>
        <FormControl id="Stock">
          <FormLabel>
            <b>Stock</b> : {product.stock}
          </FormLabel>
        </FormControl>
        <FormControl id="Price">
          <FormLabel>
            <b>Price</b> : {product.price}
          </FormLabel>
        </FormControl>
        <FormControl id="quantity">
          <FormLabel>Quantity</FormLabel>
          <Input
            name="qty"
            value={qty}
            type="number"
            onChange={e => setQty(parseInt(e.target.value))}
            required
          />
        </FormControl>
        <Button
          onClick={() => doAddToCart(product, qty)}
          colorScheme="green"
          mr={3}
        >
          Add to Cart
        </Button>
      </Stack>
    </Card>
  );
};
