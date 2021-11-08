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

function OrderTable(props) {
  const toast = useToast();
  const history = useHistory();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { products, toggleRefetch } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Order Id</Th>
          <Th>Payment Code</Th>
          <Th>Seller</Th>
          <Th>Courier</Th>
          <Th isNumeric>Item Count</Th>
          <Th isNumeric>Shipping Cost</Th>
          <Th isNumeric>Total Price</Th>
          <Th>Status</Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {products.map(e => (
          <Tr>
            <Td>{e.id}</Td>
            <Td>{e.payment_code}</Td>
            <Td>{e.seller}</Td>
            <Td>{e.courier}</Td>
            <Td isNumeric>{e.item_count}</Td>
            <Td isNumeric>{e.shipping_cost}</Td>
            <Td isNumeric>{e.total_price}</Td>
            <Td>{e.status}</Td>
            <Td>
              <Grid>
                <Button
                  onClick={() => {
                    history.push('/customer/order/' + e.id);
                  }}
                  colorScheme="blue"
                >
                  Details
                </Button>
              </Grid>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

export default OrderTable;
