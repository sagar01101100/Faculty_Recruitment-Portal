import React from 'react';
import { Flex, Image, VStack, Text } from '@chakra-ui/react';

const LogoHeader = () => {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      marginBottom="20px"
      borderBottomWidth="1px"
      borderBottomStyle="solid"
      borderBottomColor="black"
      padding="10px"
    >
      <Image src="/logo.png" alt="Institute Logo" width="100px" />
      <VStack align="flex-end">
        <Text fontSize="30px" color="black">भारतीय प्रौद्योगिकी संस्थान पटना</Text>
        <Text fontSize="30px" fontWeight="bold" color="black">Indian Institute of Technology Patna</Text>
      </VStack>
    </Flex>
  );
};

export default LogoHeader;
