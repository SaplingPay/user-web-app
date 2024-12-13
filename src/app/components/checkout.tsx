import { ChakraProvider, Box, Flex, VStack, Text, Button, Image, Select, extendTheme, Center } from '@chakra-ui/react';
import { useState } from 'react';
import { useRouter } from 'next/router';



const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'gray.100',
        color: 'gray.800',
      },
    },
  },
});

function Checkout() {
  const [items, setItems] = useState([
    { id: 1, name: 'Sauvignon Blanc x2', price: 18 },
    { id: 2, name: 'Sea Bream Carpaccio', price: 16 },
    { id: 3, name: 'Tonarelli Cacio e Pepe x2', price: 72 },
  ]);

  const total = items.reduce((acc, item) => acc + item.price, 0);
  const router = useRouter();

  
  
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleNavigateToSplit = () => {
    router.push('/split'); 
  };
  

  return (
    <ChakraProvider theme={theme}>
      <Flex align="center" justify="center" h="100vh" p={4}>
        <Box w="full" maxW="sm" bg="white" shadow="xl" rounded="2xl" overflow="hidden">
          <Center bg="gray.200" p={3}>
            <Text fontSize="xl" fontWeight="bold">Checkout</Text>
          </Center>
          <VStack spacing={4} align="stretch" m={4}>
            <Box>
              <Flex justify="space-between" align="center">
                <Text fontWeight="bold" mb={2}>Payment method</Text>
                <Text color="blue.500" fontSize="sm">Add payment method</Text>
              </Flex>
              <Select placeholder="Select payment method" bg="gray.50" mb={2} value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                <option value="Bank Card">💳 Bank Card</option>
                <option value="Cash">💵 Cash</option>
                <option value="Apple Pay">🍏 Apple Pay</option>
              </Select>
              {paymentMethod === "Bank Card" && (
                <Center bg="gray.50" p={2} rounded="md" borderWidth="1px">
                  <Image src="/credit-card-image.jpg" alt="Credit Card" htmlWidth="100" htmlHeight="160" objectFit="cover" rounded="md" />
                </Center>
              )}
            </Box>
            <Box>
              <Text fontWeight="bold" mb={2}>Order Summary</Text>
              <VStack spacing={2} divider={<Box borderColor="gray.200" borderWidth="1px" />}>
                {items.map((item) => (
                  <Flex key={item.id} justify="space-between" w="full">
                    <Text fontStyle="italic">{item.name}</Text>
                    <Text fontWeight="semibold">€{item.price.toFixed(2)}</Text>
                  </Flex>
                ))}
              </VStack>
            </Box>
            <Flex justify="space-between" mt={4}>
              <Text fontSize="lg" fontWeight="bold">Total to pay</Text>
              <Text fontSize="lg" fontWeight="bold">€{total.toFixed(2)}</Text>
            </Flex>
            <Button variant="outline" colorScheme="black" size="lg" mt={4} w="full" _hover={{ bg: 'black', color: 'white' }}>
              Add more items
            </Button>
            <Button
               bg="black"
              color="white"
              size="lg"
             mt={2}
              w="full"
             _hover={{ bg: 'gray.800' }}
                 onClick={handleNavigateToSplit}
              >
               Pay or split bill
              </Button>

          </VStack>
        </Box>
      </Flex>
    </ChakraProvider>
  );
}

export default Checkout;
