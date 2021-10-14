import {
  Table,
  Thead,
  Tbody,
  Box,
  Tr,
  Th,
  Td,
  Image,
  Button,
  Grid,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';

function ProductTable(props) {
  const history = useHistory();
  const { products } = props;
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th></Th>
          <Th>Product</Th>
          <Th>Description</Th>
          <Th isNumeric>Stock</Th>
          <Th isNumeric>Price</Th>
          <Th>
            <Button
              colorScheme="green"
              onClick={() => {
                history.push('/seller/products/add');
              }}
            >
              Add Products
            </Button>
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {products.map(e => (
          <Tr>
            <Td>
              <Box height={50} width={50}>
                <Image src={e.image} />
              </Box>
            </Td>
            <Td>{e.name}</Td>
            <Td>{e.description}</Td>
            <Td isNumeric>{e.stock}</Td>
            <Td isNumeric>{e.price}</Td>
            <Td>
              <Grid>
                <Button colorScheme="blue">Edit</Button>
                <Button colorScheme="red">Delete</Button>
              </Grid>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

export default ProductTable;
