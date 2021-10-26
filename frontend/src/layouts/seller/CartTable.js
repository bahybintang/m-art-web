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
import { deleteProduct } from '../../helpers/AddToCart';
import { useState } from 'react';

function CartTable(props) {
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
          <Th isNumeric>Quantity</Th>
          <Th>
            <Button
              colorScheme="green"
              variant="solid"
              onClick={() => {
                history.push('/seller/checkout');
              }}
            >
              Checkout
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
            <Td isNumeric>{e.qty}</Td>
            <Td>
              <Grid>
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
              onClick={() => {
                toast({
                  title: 'Deleting Product',
                  description: 'Product is being deleted!',
                  duration: 2000,
                  isClosable: true,
                });
                deleteProduct(selectedProduct);
                toast({
                  title: 'Delete Success!',
                  status: 'success',
                  duration: 2000,
                  isClosable: true,
                });
                history.push('/seller/cart');
                toggleRefetch();
                onClose();
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

export default CartTable;
