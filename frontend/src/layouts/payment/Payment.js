import {
  Box,
  Heading,
  Text,
  useColorModeValue,
  Stack,
  useRadioGroup,
  Button,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Card } from './Card';
import { Logo } from './Logo';
import RadioCard from './RadioCard';
import { getCurrentOrder, clearCurrentOrder } from '../../helpers/AddOrders';

function Payment() {
  const history = useHistory();

  const [payToken, setPayToken] = useState('');
  const [optionsMap, setOptionsMap] = useState({});
  const [options, setOptions] = useState([]);
  const [paymentType, setPaymentType] = useState(null);
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'paymentType',
    defaultValue: null,
    onChange: setPaymentType,
  });

  const group = getRootProps();

  useEffect(() => {
    const randInt = Math.floor(Math.random() * 1000000);
    const token = 'PAY-' + `${randInt}`.padStart(7, '0');
    setPayToken(token);

    const data = [
      { id: 1, name: 'OVO' },
      { id: 2, name: 'Transfer Bank' },
      { id: 3, name: 'Cash on Delivery' },
    ];
    const optsMap = {};
    const opts = [];
    for (let d of data) {
      opts.push(d.name);
      optsMap[d.name] = d.id;
    }
    setOptions(opts);
    setOptionsMap(optsMap);
  }, []);

  function doPay() {
    const payment_id = optionsMap[paymentType];
    const order_id = getCurrentOrder();
    const paymentToken = payToken;

    console.log(payment_id, order_id, paymentToken);
    clearCurrentOrder();
    history.push('/customer/orders');
  }

  return (
    <Box
      bg={useColorModeValue('gray.50', 'inherit')}
      minH="100vh"
      py="12"
      px={{ base: '4', lg: '8' }}
    >
      <Box maxW="md" mx="auto">
        <Logo mx="auto" h="8" mb={{ base: '10', md: '20' }} />
        <Heading textAlign="center" size="xl" fontWeight="extrabold">
          Payment Portal
        </Heading>
        <Text mt="4" mb="8" align="center" maxW="md" fontWeight="medium">
          <Text as="span">Your payment token: {payToken}</Text>
        </Text>
        <Stack>
          <Card>
            <Stack {...group}>
              {options.map(value => {
                const radio = getRadioProps({ value });
                return (
                  <RadioCard key={value} {...radio}>
                    {value}
                  </RadioCard>
                );
              })}
            </Stack>
          </Card>
          <Button
            type="submit"
            onClick={doPay}
            colorScheme="green"
            size="lg"
            fontSize="md"
          >
            Pay
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}

export default Payment;
