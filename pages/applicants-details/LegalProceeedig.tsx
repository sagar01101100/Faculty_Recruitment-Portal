import React from 'react';
import { Box, Text, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

const LegalProceeding = ({ getFieldValue }) => {
  return (
    <Box marginTop="0px" overflowX="auto">
      <Text fontSize="15px" fontWeight="bold" marginBottom="1px" textColor="black">
        Legal History
      </Text>
      <Table variant="simple" size="sl" textColor="black" border="1px" borderColor="black" marginBottom="10px">
        <Thead>
          <Tr border="1px" borderColor="black">
          
          </Tr>
        </Thead>
        <Tbody>
          <Tr border="1px" borderColor="black"  fontSize="12px">
            <Td border="1px" borderColor="black">Do you have any legal proceeding ongoing</Td>
            <Td border="1px" borderColor="black">{getFieldValue("Do you have any legal proceeding ongoing")}</Td>
          </Tr>
          <Tr border="1px" borderColor="black"  fontSize="12px">
            <Td border="1px" borderColor="black">Have you at any time been charged acquitted or convicted by a court of law in India or outside India</Td>
            <Td border="1px" borderColor="black">{getFieldValue("Have you at any time been charged acquitted or convicted by a court of law in India or outside India")}</Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
};

export default LegalProceeding;