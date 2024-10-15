

import React from 'react';
import { Box, Text, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

const ThesisGuidedTable = ({ getFieldValue }) => {
  return (
    <Box marginTop="0px" overflowX="auto">
      <Text fontSize="15px" fontWeight="bold" marginBottom="1px" textColor="black">
        Thesis Guided
      </Text>
      <Table variant="simple" size="sl" textColor="black" border="1px" borderColor="black" marginBottom="10px">
        <Thead>
          <Tr border="1px" borderColor="black"  fontSize="12px">
            <Th border="1px" borderColor="black">Completed</Th>
            <Th border="1px" borderColor="black">Ongoing</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr border="1px" borderColor="black"  fontSize="12px">
            <Td border="1px" borderColor="black">{getFieldValue("No. of Ph.D. thesis guided (completed)")}</Td>
            <Td border="1px" borderColor="black">{getFieldValue("No. of Ph.D. thesis guided (ongoing)")}</Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
};

export default ThesisGuidedTable;