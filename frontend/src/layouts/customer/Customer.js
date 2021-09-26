import React from 'react';
import { Box, Text, VStack, Grid } from '@chakra-ui/react';
import { ColorModeSwitcher } from '../../components/ColorModeSwitcher';
import { withAuthCustomer } from '../../helpers/Auth';

function Customer() {
  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <VStack spacing={8}>
          <Text>Welcome Customer!</Text>
        </VStack>
      </Grid>
    </Box>
  );
}

export default withAuthCustomer(Customer);
