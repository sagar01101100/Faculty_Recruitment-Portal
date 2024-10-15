import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const TimeTakenToJoin = ({ getFieldValue }) => {
  return (
    <Box marginTop="10px" overflowX="auto" marginBottom="10px">
      <Text fontSize="12px" textColor="black">
        <strong>If the appointment is offered, how much time would you need before joining the post? : </strong> 
        <strong>{getFieldValue("If the appointment is offered, how much time would you need before joining the post?")}</strong>
      </Text>
    </Box>
  );
};

export default TimeTakenToJoin;