import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useToast,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  HStack,
  useRadioGroup,
} from '@chakra-ui/react';
import { useState } from 'react';
import { addAddress } from '../../helpers/Api';
import RadioCard from './RadioCard';

function AddAddress({ isOpen, onClose, onOpen, toggleRefetch }) {
  const [data, setData] = useState({});
  const [isPrimary, setIsPrimary] = useState(false);
  const toast = useToast();

  const options = ['Yes', 'No'];
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'framework',
    defaultValue: 'No',
    onChange: changeIsPrimary,
  });
  const group = getRootProps();

  function changeIsPrimary(primary) {
    setIsPrimary(primary == 'Yes' ? true : false);
  }

  function onChangeForm(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Address</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl id="recipient">
            <FormLabel>Recipient</FormLabel>
            <Input
              name="recipient"
              placeholder="Recipient"
              type="text"
              onChange={onChangeForm}
              required
            />
          </FormControl>
          <FormControl id="address">
            <FormLabel>Address</FormLabel>
            <Textarea
              name="address"
              placeholder="Address"
              size="sm"
              onChange={onChangeForm}
              required
            />
          </FormControl>
          <FormControl id="latitude">
            <FormLabel>Latitude</FormLabel>
            <Input
              name="latitude"
              placeholder="Latitude"
              type="text"
              onChange={onChangeForm}
              required
            />
          </FormControl>
          <FormControl id="longitude">
            <FormLabel>Longitude</FormLabel>
            <Input
              name="longitude"
              placeholder="Longitude"
              type="text"
              onChange={onChangeForm}
              required
            />
          </FormControl>
          <FormControl id="primary-account">
            <FormLabel>Primary Account</FormLabel>
            <HStack {...group}>
              {options.map(value => {
                const radio = getRadioProps({ value });
                return (
                  <RadioCard key={value} {...radio}>
                    {value}
                  </RadioCard>
                );
              })}
            </HStack>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="green"
            mr={3}
            onClick={async () => {
              toast({
                title: 'Adding Product',
                description: 'Address is being added!',
                duration: 2000,
                isClosable: true,
              });
              await addAddress(
                data.recipient,
                data.address,
                data.latitude,
                data.longitude,
                isPrimary
              );
              toast({
                title: 'Add Address Success!',
                status: 'success',
                duration: 2000,
                isClosable: true,
              });
              // history.push('/customer/cart');
              toggleRefetch();
              onClose();
            }}
          >
            Add
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default AddAddress;
