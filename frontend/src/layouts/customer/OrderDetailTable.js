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

function OrderDetailTable(props) {
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
          <Th isNumeric>Price</Th>
          <Th isNumeric>Quantity</Th>
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
            <Td isNumeric>{e.price}</Td>
            <Td isNumeric>{e.qty}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

export default OrderDetailTable;
