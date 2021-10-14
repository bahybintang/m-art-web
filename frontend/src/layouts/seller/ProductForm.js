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
  NumberDecrementStepper,
} from '@chakra-ui/react';
import { addProduct } from '../../helpers/Api';
import { useHistory } from 'react-router-dom';

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

export const ProductForm = props => {
  const history = useHistory();
  const toast = useToast();

  return (
    <chakra.form
      onSubmit={async e => {
        e.preventDefault();
        const product_name = e.target[0].value;
        const description = e.target[1].value;
        const stock = e.target[2].value;
        const price = e.target[3].value;
        const photo = e.target[4].files[0];

        toast({
          title: 'Adding Product',
          description: 'Product is being added!',
          duration: 2000,
          isClosable: true,
        });

        const result = await addProduct(
          product_name,
          description,
          stock,
          price,
          photo
        );

        if (!result.statusCode) {
          history.push('/seller/products');
        } else {
          toast({
            title: 'Add Product Failed',
            description: result.message || 'Some error occurred!',
            status: 'warning',
            duration: 3000,
            isClosable: true,
          });
        }
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
        <FormControl id="photo">
          <FormLabel>Photo</FormLabel>
          <Input name="photo" placeholder="Photo" type="file" required />
        </FormControl>
        <Button type="submit" colorScheme="blue" size="lg" fontSize="md">
          Add
        </Button>
      </Stack>
    </chakra.form>
  );
};
