import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const AdvertisementNumber = ({ advertisementNumber }) => {
  return (
    <Box backgroundColor="white" marginBottom="20px" textAlign="center" padding="10px">
      <Text color="black" fontWeight="bold" fontSize="15px">
        Advertisement No. {advertisementNumber}
      </Text>
    </Box>
  );
};

export default AdvertisementNumber;
