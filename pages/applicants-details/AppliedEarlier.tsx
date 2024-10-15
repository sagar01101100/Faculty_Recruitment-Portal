import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const BooksPublished = ({ getFieldValue }) => {
  return (
    <Box marginTop="10px" overflowX="auto" marginBottom="10px">
      <Text fontSize="12px" textColor="black">
        <strong>Did you previously apply for any post in this Institute? / Advertisement Number : </strong> 
        <strong>{getFieldValue("Did you previously apply for any post in this Institute? If so, enter advertisement number")}</strong>
      </Text>
    </Box>
  );
};

export default BooksPublished;