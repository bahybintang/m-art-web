import { useState, useEffect } from 'react';
import { getCart } from '../../helpers/AddToCart';
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
  useColorModeValue,
} from '@chakra-ui/react';
import Config from '../../config';
import { getAllCouriers, getAddressesById } from '../../helpers/Api';
import { getUserData } from '../../helpers/Auth';
// import _ from 'lodash';

function Checkout() {
  const [couriers, setCouriers] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [sellers, setSellers] = useState({});
  const [sellerAddresses, setSellerAddresses] = useState({});
  const [courierPrice, setCourierPrice] = useState({});
  const [selectedCourier, setSelectedCourier] = useState({});
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [cart, setCart] = useState({});
  const [rawCart, setRawCart] = useState([]);

  const curColorMode = useColorModeValue('white', 'gray.900');

  useEffect(() => {
    (async function () {
      const cartRaw = getCart();
      const tmpCart = {};
      const tmpSeller = {};
      const tmpSellerAddresses = {};

      for (let c of cartRaw) {
        if (!(c.seller.id in tmpCart)) {
          tmpCart[c.seller.id] = [c];
        } else {
          tmpCart[c.seller.id] = [...tmpCart[c.seller.id], c];
          tmpSeller[c.seller.id] = c.seller;
          tmpSellerAddresses[c.seller.id] = (
            await getAddressesById(c.seller.id)
          ).find(e => e.primary === true);
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
      setCourierPrice({ ...courierPrice, [seller_id]: price });
    } catch {}
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
          <Select
            placeholder="Select address"
            onChange={e => {
              setSelectedAddress(e.target.value);
            }}
          >
            {addresses.map(e => (
              <option value={e.id}>
                {e.recipient} - {e.address}
              </option>
            ))}
          </Select>
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
            <Text align="left">
              Product Price: Rp
              {rawCart.reduce((prev, cur) => prev + cur.price * cur.qty, 0)}
            </Text>
            <Text align="left">
              Shipping Price: Rp
              {Object.values(courierPrice).reduce(
                (prev, cur) => parseFloat(prev) + parseFloat(cur),
                0
              )}
            </Text>
            <Text align="left">
              Total Price: Rp
              {rawCart.reduce((prev, cur) => prev + cur.price * cur.qty, 0) +
                Object.values(courierPrice).reduce(
                  (prev, cur) => parseFloat(prev) + parseFloat(cur),
                  0
                )}
            </Text>
            <Button colorScheme="green">Pay</Button>
          </Stack>
        </Box>
      </Stack>
    </Center>
  );
}
export default Checkout;
