import { useState, useEffect } from 'react';
import { getCart, emptyCart } from '../../helpers/AddToCart';
import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  Button,
  Link,
  Badge,
  Image,
  Select,
  SimpleGrid,
  useColorModeValue,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import Config from '../../config';
import { getAllCouriers, getAddressesById, addOrder } from '../../helpers/Api';
import { getUserData } from '../../helpers/Auth';
import { saveCurrentOrder } from '../../helpers/AddOrders';
import AddAddress from './AddAdrress';
// import _ from 'lodash';

function Checkout() {
  const history = useHistory();

  const [couriers, setCouriers] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [sellers, setSellers] = useState({});
  const [sellerAddresses, setSellerAddresses] = useState({});
  const [courierPrice, setCourierPrice] = useState({});
  const [selectedCourier, setSelectedCourier] = useState({});
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [cart, setCart] = useState({});
  const [rawCart, setRawCart] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const curColorMode = useColorModeValue('white', 'gray.900');
  const toast = useToast();

  useEffect(() => {
    (async function () {
      const cartRaw = getCart();
      const tmpCart = {};
      const tmpSeller = {};
      const tmpSellerAddresses = {};

      for (let c of cartRaw) {
        if (!(c.seller.id in tmpCart)) {
          tmpCart[c.seller.id] = [c];
          tmpSellerAddresses[c.seller.id] = (
            await getAddressesById(c.seller.id)
          ).find(e => e.primary === true);
          tmpSeller[c.seller.id] = c.seller;
        } else {
          tmpCart[c.seller.id] = [...tmpCart[c.seller.id], c];
        }
      }

      setRawCart(cartRaw);
      setCart(tmpCart);
      setSellers(tmpSeller);
      setSellerAddresses(tmpSellerAddresses);

      const data = await getAllCouriers();
      setCouriers(data);

      const addresses = await getAddressesById(getUserData().id);
      setAddresses(addresses);
    })();
  }, []);

  async function fetchAddresses() {
    const addresses = await getAddressesById(getUserData().id);
    setAddresses(addresses);
  }

  function setCourierByIdSeller(seller_id, courier_id) {
    try {
      const dstAddress = addresses.find(e => e.id == selectedAddress);
      const srcAddress = sellerAddresses[seller_id];
      const courier = couriers.find(e => e.id == courier_id);
      const price = (
        calcCrow(
          dstAddress.latitude,
          dstAddress.longitude,
          srcAddress.latitude,
          srcAddress.longitude
        ) * courier.price_per_km
      ).toFixed(0);
      setSelectedCourier({ ...selectedCourier, [seller_id]: courier_id });
      setCourierPrice({ ...courierPrice, [seller_id]: toNearest500(price) });
    } catch {}
  }

  function toNearest500(num) {
    let div = Math.ceil(num / 500);
    return div * 500;
  }

  async function doOrder(seller_id) {
    const shipping_cost = parseFloat(courierPrice[seller_id]);
    const total_price =
      shipping_cost +
      cart[seller_id].reduce((prev, cur) => prev + cur.price * cur.qty, 0);
    const status = 'waiting';
    const courier_id = couriers.find(
      e => e.id == selectedCourier[seller_id]
    ).id;
    const order_details = cart[seller_id].map(e => ({
      product_id: e.id,
      quantity: e.qty,
      unit_price: e.price,
    }));
    const address_id = selectedAddress;

    return await addOrder(
      total_price,
      shipping_cost,
      status,
      seller_id,
      address_id,
      courier_id,
      order_details
    );
  }

  async function doOrders() {
    toast({
      title: 'Ordering',
      duration: 2000,
      isClosable: true,
    });
    for (let seller in sellers) {
      let { id } = await doOrder(seller);
      saveCurrentOrder(id);
    }
    toast({
      title: 'Order Success',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
    emptyCart();
    history.push('/pay');
  }

  function calcCrow(lat1, lon1, lat2, lon2) {
    lat1 = parseFloat(lat1);
    lat2 = parseFloat(lat2);
    lon1 = parseFloat(lon1);
    lon2 = parseFloat(lon2);

    var R = 6371; // km
    var dLat = toRad(lat2 - lat1);
    var dLon = toRad(lon2 - lon1);
    var lat1 = toRad(lat1);
    var lat2 = toRad(lat2);

    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
  }

  // Converts numeric degrees to radians
  function toRad(Value) {
    return (Value * Math.PI) / 180;
  }

  return (
    <Center py={6}>
      <AddAddress
        onClose={onClose}
        onOpen={onOpen}
        isOpen={isOpen}
        toggleRefetch={fetchAddresses}
      />
      <Stack>
        <Box
          maxW={'720px'}
          w={'full'}
          bg={curColorMode}
          boxShadow={'2xl'}
          rounded={'lg'}
          p={6}
          textAlign={'center'}
        >
          <Stack>
            <Select
              placeholder="Select address"
              onChange={e => {
                setSelectedAddress(e.target.value);
              }}
            >
              {addresses.map(e => (
                <option value={e.id}>
                  {e.primary ? `[Primary] - ` : ''}
                  {e.recipient} - {e.address}
                </option>
              ))}
            </Select>
            <Button colorScheme="green" onClick={onOpen}>
              Add Address
            </Button>
          </Stack>
        </Box>
        <Box
          maxW={'720px'}
          w={'full'}
          bg={curColorMode}
          boxShadow={'2xl'}
          rounded={'lg'}
          p={6}
          textAlign={'center'}
        >
          <Stack spacing={6}>
            {Object.keys(cart).map(key => (
              <Stack direction="row">
                <Stack>
                  {cart[key].map(e => (
                    <Box
                      maxW={'620px'}
                      w={'full'}
                      bg={curColorMode}
                      boxShadow={'2xl'}
                      rounded={'lg'}
                      p={6}
                      textAlign={'center'}
                    >
                      <Stack direction="row" spacing={10}>
                        <Avatar
                          size={'lg'}
                          src={
                            Config.API_URL + e.photos[0].formats.thumbnail.url
                          }
                          alt={'Product Alt'}
                          mb={4}
                          pos={'relative'}
                        />
                        <Stack justify="left">
                          <Heading align="left" size="sm">
                            {e.product_name}
                          </Heading>
                          <Text align="left">
                            {e.qty} pcs x Rp{e.price}
                          </Text>
                        </Stack>
                      </Stack>
                    </Box>
                  ))}
                </Stack>
                <Stack>
                  <Text align="right">
                    Penjual: {key in sellers ? sellers[key].username : ''}
                  </Text>
                  <Select
                    placeholder="Select courier"
                    onChange={e => {
                      setCourierByIdSeller(key, e.target.value);
                    }}
                  >
                    {couriers.map(e => (
                      <option value={e.id}>{e.name}</option>
                    ))}
                  </Select>
                  <Text align="right">
                    Estimated Price: Rp
                    {key in courierPrice ? courierPrice[key] : ''}
                  </Text>
                </Stack>
              </Stack>
            ))}
          </Stack>
        </Box>
        <Box
          maxW={'720px'}
          w={'full'}
          bg={curColorMode}
          boxShadow={'2xl'}
          rounded={'lg'}
          p={6}
          textAlign={'center'}
        >
          <Stack>
            <Heading align="left" size="sm">
              Order Summary
            </Heading>
            <SimpleGrid columns={2}>
              <Text align="left">Product Price</Text>
              <Text align="right">
                Rp
                {rawCart.reduce((prev, cur) => prev + cur.price * cur.qty, 0)}
              </Text>
              <Text align="left">Shipping Price</Text>
              <Text align="right">
                Rp
                {Object.values(courierPrice).reduce(
                  (prev, cur) => parseFloat(prev) + parseFloat(cur),
                  0
                )}
              </Text>
              <Text align="left">Total Price</Text>
              <Text align="right">
                Rp
                {rawCart.reduce((prev, cur) => prev + cur.price * cur.qty, 0) +
                  Object.values(courierPrice).reduce(
                    (prev, cur) => parseFloat(prev) + parseFloat(cur),
                    0
                  )}
              </Text>
            </SimpleGrid>
            <Button onClick={doOrders} colorScheme="green">
              Order
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Center>
  );
}
export default Checkout;
