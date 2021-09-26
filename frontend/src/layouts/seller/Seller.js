import React from 'react';
import { Box, Text, VStack, Grid, Button } from '@chakra-ui/react';
import { ColorModeSwitcher } from '../../components/ColorModeSwitcher';
import { withAuthSeller, doLogout } from '../../helpers/Auth';

function Seller() {
  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <VStack spacing={8}>
          <Text>Welcome Seller!</Text>
          <Button onClick={doLogout}>Logout</Button>
        </VStack>
      </Grid>
    </Box>
  );
}

export default withAuthSeller(Seller);
