import { ProfileForm } from './ProfileForm';
import { Box, Heading, Text, useColorModeValue, Stack } from '@chakra-ui/react';
import { Card } from './Card';

function Profile() {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'inherit')}
      minH="100vh"
      py="12"
      px={{ base: '4', lg: '8' }}
    >
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
            </Stack>
          </Card>
        </Stack>
      </Box>
    </Box>
  );
}

export default Profile;
