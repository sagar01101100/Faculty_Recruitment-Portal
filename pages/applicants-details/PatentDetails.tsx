import React from 'react';
import { Box, Text, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

const PatentDetails = ({ getFieldValue }) => {
  return (
    <Box marginTop="0px" overflowX="auto">
      <Text fontSize="15px" fontWeight="bold" textColor="black">
        Patent Details
      </Text>
      <Table variant="simple" size="sl" textColor="black" border="1px solid black" marginBottom="10px">
        <Thead>
          <Tr  fontSize="12px">
            <Th textAlign="left" border="1px solid black">Number of Patents</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr >
            <Td border="1px solid black" fontSize="12px" >
              {getFieldValue("No. of patents (mention the status as well)")}
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
};

export default PatentDetails;
