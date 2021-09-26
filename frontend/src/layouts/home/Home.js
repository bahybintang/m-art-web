import React from 'react';
import { Box, Text, Link, VStack, Code, Grid } from '@chakra-ui/react';
import { ColorModeSwitcher } from '../../components/ColorModeSwitcher';

function Home() {
  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <VStack spacing={8}>
          <Text>Hello, please login!</Text>
          <Link
            color="teal.500"
            href="/login"
            fontSize="2xl"
            target="_blank"
            rel="noopener noreferrer"
          >
            Login
          </Link>
        </VStack>
      </Grid>
    </Box>
  );
}

export default Home;
