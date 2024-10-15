
import React from 'react';
import { Box, Text, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

const BooksPublished = ({ getFieldValue }) => {
  return (
    <Box marginTop="0px" overflowX="auto">
      <Text fontSize="15px" fontWeight="bold" marginBottom="1px" textColor="black">
        Book Published
      </Text>
      <Table variant="simple" size="sl" textColor="black" border="1px" borderColor="black" marginBottom="10px">
        <Thead>
          <Tr border="1px" borderColor="black">
          
          </Tr>
        </Thead>
        <Tbody>
          <Tr border="1px" borderColor="black"  fontSize="12px">
            <Td border="1px" borderColor="black">Name of the Boks</Td>
            <Td border="1px" borderColor="black">{getFieldValue(" Provide list of books published")}</Td>
          </Tr>
          <Tr border="1px" borderColor="black"  fontSize="12px">
            <Td border="1px" borderColor="black">Name of the chapters</Td>
            <Td border="1px" borderColor="black">{getFieldValue(" Provide list of book chapters published")}</Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
};

export default BooksPublished;
