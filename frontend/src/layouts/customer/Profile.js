import { ProfileForm } from './ProfileForm';
import {
  Box,
  Heading,
  Text,
  useColorModeValue,
  Stack,
  useDisclosure,
  Select,
  Button,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { Card } from './Card';
import { getAddressesById } from '../../helpers/Api';
import { getUserData } from '../../helpers/Auth';
import AddAddress from './AddAdrress';

function Profile() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    (async function () {
      const addresses = await getAddressesById(getUserData().id);
      setAddresses(addresses);
    })();
  }, []);

  async function fetchAddresses() {
    const addresses = await getAddressesById(getUserData().id);
    setAddresses(addresses);
  }

  return (
    <Box
      bg={useColorModeValue('gray.50', 'inherit')}
      minH="100vh"
      py="12"
      px={{ base: '4', lg: '8' }}
    >
      <AddAddress
        onClose={onClose}
        onOpen={onOpen}
        isOpen={isOpen}
        toggleRefetch={fetchAddresses}
      />
      <Box maxW="md" mx="auto">
        <Stack>
          <Card>
            <Stack spacing={10}>
              <Heading textAlign="center" size="xl" fontWeight="extrabold">
                Your Account
              </Heading>
              <ProfileForm />
            </Stack>
          </Card>
          <Card>
            <Stack>
              <Heading textAlign="center">Your Address</Heading>
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
          </Card>
        </Stack>
      </Box>
    </Box>
  );
}

export default Profile;
