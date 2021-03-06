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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useToast,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { deleteProductById } from '../../helpers/Api';
import { useState } from 'react';
import { createLogicalOr } from 'typescript';

function ProductTable(props) {
  const toast = useToast();
  const history = useHistory();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { products, toggleRefetch } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

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
                <Button
                  onClick={() => {
                    setSelectedProduct(e.id);
                    onOpen();
                  }}
                  colorScheme="red"
                >
                  Delete
                </Button>
              </Grid>
            </Td>
          </Tr>
        ))}
      </Tbody>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Confirmation</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <p>Are you sure you want to delete this item?</p>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={async e => {
                toast({
                  title: 'Deleting Product',
                  description: 'Product is being deleted!',
                  duration: 2000,
                  isClosable: true,
                });

                const result = await deleteProductById(selectedProduct);

                console.log(result);

                if (!result.statusCode) {
                  history.push('/seller/products');
                  toggleRefetch();
                  onClose();
                } else {
                  toast({
                    title: 'Delete Product Failed',
                    description: result.message || 'Some error occurred!',
                    status: 'warning',
                    duration: 3000,
                    isClosable: true,
                  });
                }
              }}
            >
              Delete
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Table>
  );
}

export default ProductTable;
