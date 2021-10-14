import {
  chakra,
  FormControl,
  FormLabel,
  Stack,
  Image,
  Center
} from '@chakra-ui/react';
import Config from '../../config';

export const ShowProduct = props => {
  const { product } = props;
  const photo = product ? Config.API_URL + product.photos[0].formats.thumbnail.url : "";
  return (
    <chakra.form>
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
      </Stack>
    </chakra.form>
  );
};
