import React from 'react';
import { Box, Text, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

interface ReferencesTableProps {
  getFieldValue: (field: string) => string;
}

const ReferencesTable: React.FC<ReferencesTableProps> = ({ getFieldValue }) => {
  return (
    <Box marginTop="10px" overflowX="auto" style={{ pageBreakInside: 'avoid' }}>
      <Text fontSize="15px" fontWeight="bold" marginBottom="1px" textColor="black">References</Text>
      <Table variant="simple" size="sl" textColor="black" border="1px solid black" >
        <Thead>
          <Tr border="1px solid black" fontSize="12px">
            <Th border="1px solid black">Name</Th>
            <Th border="1px solid black">Designation</Th>
            <Th border="1px solid black">Address</Th>
            <Th border="1px solid black">Email</Th>
          </Tr>
        </Thead>
        <Tbody>
          {[1, 2, 3].map((index) => (
            <Tr key={index} border="1px solid black" style={{ lineHeight: '1em' }} fontSize="12px">
              <Td border="1px solid black" fontSize="10px">{getFieldValue(`Name of Referrer ${index}`)}</Td>
              <Td border="1px solid black" fontSize="10px">{getFieldValue(`Designation of Referrer ${index}`)}</Td>
              <Td border="1px solid black" fontSize="10px">{getFieldValue(`Address of Referrer ${index}`)}</Td>
              <Td border="1px solid black" fontSize="10px">{getFieldValue(`Email Address of Referrer ${index}`)}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default ReferencesTable;
