import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const Specialization = ({ getFieldValue }) => {
  return (
    <Box marginTop="10px" overflowX="auto" marginBottom="10px">
      <Text fontSize="12px" textColor="black"><strong>  Specialization: </strong> 
        <strong>{getFieldValue("Areas of specialization")}</strong>
      </Text>
    </Box>
  );
};

export default Specialization;