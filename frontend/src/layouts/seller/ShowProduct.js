import {
  FormControl,
  FormLabel,
  Stack,
  Image,
  Center,
  Button
} from '@chakra-ui/react';
import Config from '../../config';
import { addToChart } from '../../helpers/AddToChart';
import { Card } from '../login/Card';

export const ShowProduct = props => {
  const { product } = props;
  console.log(product);
  const photo = product ? Config.API_URL + product.photos[0].formats.thumbnail.url : "";
  const seller = product ? product.seller : "";
  return (
    <Card>
      <Stack spacing="6">
        <Center>
        <Image
            borderRadius="full"
            boxSize="150px"
            src={photo}
        />
        </Center>
        <FormControl id="product-name">
          <FormLabel> <b>Product Name</b> : {product ? product.product_name :  "" }</FormLabel>
        </FormControl>
        <FormControl id="seller">
          <FormLabel> <b>Seller</b> : {seller ? seller.username :  "" }</FormLabel>
        </FormControl>
        <FormControl id="description">
          <FormLabel><b>Description</b></FormLabel>
          <p>{product ? product.description : "" }</p>
        </FormControl>
        <FormControl id="Stock">
          <FormLabel><b>Stock</b> : { product ? product.stock : ""}</FormLabel>
        </FormControl>
        <FormControl id="Price">
          <FormLabel><b>Price</b> : {product ? product.price : ""}</FormLabel>
        </FormControl>
        <Button onClick={() => addToChart(product)} colorScheme="green" mr={3}>
              Add to Chart
        </Button>
      </Stack>
    </Card>
  );
};
