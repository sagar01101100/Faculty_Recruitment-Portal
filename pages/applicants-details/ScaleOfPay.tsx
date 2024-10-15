import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const ScaleOfPay = ({ getFieldValue }) => {
  return (
    <Box marginTop="10px" overflowX="auto" marginBottom="10px">
      <Text fontSize="12px" textColor="black"><strong> If you are employed, please state your present basic pay and scale of pay:  </strong> 
        <strong>{getFieldValue("If you are employed, please state your present basic pay and scale of pay")}</strong>
      </Text>
    </Box>
  );
};

export default ScaleOfPay;