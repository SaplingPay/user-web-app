import {
    ChakraProvider,
    Box,
    VStack,
    Button,
    Heading,
    Text,
    Flex,
    theme,
    Icon,
  } from '@chakra-ui/react';
  import { CheckCircleIcon } from '@chakra-ui/icons';
  
  function PaymentSuccess({  }) {
    return (
      <ChakraProvider theme={theme}>
        <Box
          bg='gray.100'
          w='full'
          minH='100vh'
          p={4}
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          <VStack
            spacing={4}
            bg='white'
            p={6}
            rounded='lg'
            boxShadow='base'
            textAlign='center'
          >
            <Icon as={CheckCircleIcon} w={16} h={16} color='green.500' />
            <Heading size='lg'>Payment Successful</Heading>
            <Text>Your payment has been processed successfully.</Text>
            <Button colorScheme='teal' w='full' >
              Go to Home
            </Button>
          </VStack>
        </Box>
      </ChakraProvider>
    );
  }
  
  export default PaymentSuccess;
  