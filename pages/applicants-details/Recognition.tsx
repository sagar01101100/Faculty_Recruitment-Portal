import React from 'react';
import { Box, Text, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

const Recognition = ({ getFieldValue }) => {
  return (
    <Box marginTop="0px" overflowX="auto"  style={{ breakInside: 'avoid' }}>
      <Text fontSize="15px" fontWeight="bold" marginBottom="1px" textColor="black">
        Recognition
      </Text>
      <Table variant="simple" size="sl" textColor="black" border="1px" borderColor="black" marginBottom="10px">
        <Thead  fontSize="12px">
          <Tr border="1px" borderColor="black">
            <Th border="1px" borderColor="black" width="25%">Category</Th>
            <Th border="1px" borderColor="black">Details</Th>
          </Tr>
        </Thead>
        <Tbody  fontSize="12px">
          <Tr border="1px" borderColor="black">
            <Td border="1px" borderColor="black">Fellow of professional body</Td>
            <Td border="1px" borderColor="black">{getFieldValue("Fellow of professional body")}</Td>
          </Tr>
          <Tr border="1px" borderColor="black">
            <Td border="1px" borderColor="black">Member of professional body</Td>
            <Td border="1px" borderColor="black">{getFieldValue("Member of professional body")}</Td>
          </Tr>
          <Tr border="1px" borderColor="black">
            <Td border="1px" borderColor="black">Editorial board memberships</Td>
            <Td border="1px" borderColor="black">{getFieldValue("Editorial board memberships")}</Td>
          </Tr>
          <Tr border="1px" borderColor="black">
            <Td border="1px" borderColor="black">Seminars/conferences organized</Td>
            <Td border="1px" borderColor="black">{getFieldValue("Seminars/conferences organized (enter comma-separated entries)")}</Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
};

export default Recognition;


