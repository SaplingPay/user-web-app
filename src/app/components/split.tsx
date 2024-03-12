import {
    ChakraProvider,
    Box,
    VStack,
    Button,
    Heading,
    Text,
    Avatar,
    AvatarGroup,
    IconButton,
    Flex,
    Input,
    Stack,
    useRadioGroup,
    HStack,
    useRadio,
    theme,
  } from '@chakra-ui/react';
  import { AddIcon } from '@chakra-ui/icons';
  import { useState } from 'react';
  import { useRouter } from 'next/router';
  
  function RadioCard(props) {
    const { getInputProps, getCheckboxProps } = useRadio(props);
  
    const input = getInputProps();
    const checkbox = getCheckboxProps();
  
    return (
      <Box as='label'>
        <input {...input} />
        <Box
          {...checkbox}
          cursor='pointer'
          borderWidth='1px'
          borderRadius='md'
          boxShadow='md'
          _checked={{
            bg: 'green.600',
            color: 'white',
            borderColor: 'green.600',
          }}
          _focus={{
            boxShadow: 'outline',
          }}
          px={5}
          py={3}
        >
          {props.children}
        </Box>
      </Box>
    );
  }
  
  function SplitBill() {
    const [tipPercentage, setTipPercentage] = useState(10);
    const router = useRouter();
    const totalAmount = 106; 
    const tipOptions = [5, 10, 15]; 
  
    const { getRootProps, getRadioProps } = useRadioGroup({
      name: 'tip',
      defaultValue: '10',
      onChange: (value) => setTipPercentage(Number(value)),
    });
  
    const group = getRootProps();
  
    const people = [
      { name: 'Megan', avatar: '/megan.jpg' },
      { name: 'Chris', avatar: '/chris.jpg' },
    ];
  
    const orderDetails = [
      { item: 'Sauvignon Blanc', price: 8, by: 'Megan' },
      { item: 'Pinot Grigio', price: 8, by: 'Chris' },
      // ... add more items
    ];

    const navigateToPayment = () => {
        router.push('/payment'); 
      };
  
    return (
        <ChakraProvider theme={theme}>
        <Box
          bg='gray.100' 
          w='full'
          minH='100vh'
          p={4}
        >
          <Box mx='auto' my={5} p={5} shadow='base' rounded='lg' bg='white' maxWidth='400px'>
            <VStack spacing={4}>
              <Box w='full' bg='gray.200' p={2} rounded='md'> {}
                <Heading size='lg' textAlign='center'>Split the bill</Heading>
              </Box>

            <Text fontWeight='bold'>Total to pay</Text>
            <Text fontSize='2xl' color='green.500'>€{totalAmount}</Text>
  
            <Flex align='center' justify='space-between' w='full'>
              <Text fontWeight='bold'>Who's splitting?</Text>
              <IconButton
                aria-label='Add person'
                icon={<AddIcon />}
                size='sm'
                variant='ghost'
              />
            </Flex>
            <AvatarGroup size='md' max={2}>
              {people.map((person, index) => (
                <Avatar key={index} name={person.name} src={person.avatar} />
              ))}
            </AvatarGroup>
  
            <Flex direction='column' w='full'>
              <Text fontWeight='bold'>Order details</Text>
              <Stack mt='2'>
                {orderDetails.map((detail, index) => (
                  <Flex key={index} justify='space-between' align='center'>
                    <Text flex='1'>{detail.item} €{detail.price}</Text>
                    <Avatar size='xs' name={detail.by} src={`/${detail.by.toLowerCase()}.jpg`} ml='2'/>
                  </Flex>
                ))}
              </Stack>
            </Flex>
  
            <Flex justify='space-between' align='center' w='full'>
              <Text fontWeight='bold'>Your total to pay</Text>
              <Text fontSize='xl' color='green.500'>€48</Text>
            </Flex>
  
            <Box w='full'>
              <Text fontWeight='bold'>Add Tip</Text>
              <HStack {...group} mt='2'>
                {tipOptions.map((value) => {
                  const radio = getRadioProps({ value: value.toString() });
                  return (
                    <RadioCard key={value} {...radio}>
                      {value}% €{(totalAmount * value / 100).toFixed(2)}
                    </RadioCard>
                  );
                })}
              </HStack>
              <Input placeholder='Enter custom tip' mt='2' />
            </Box>
  
            <Button
              bg="black"
              color="white"
              size="lg"
              mt={2}
              w="full"
              _hover={{ bg: 'gray.800' }}
              onClick={(navigateToPayment)}
            
              >
              Done
            </Button>
          </VStack>
          </Box>
        </Box>
      </ChakraProvider>
    );
  }
  
  export default SplitBill;
  