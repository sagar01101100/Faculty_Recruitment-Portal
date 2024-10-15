import React from 'react';
import { Box, Text, Table, Thead, Tbody, Tr, Td } from '@chakra-ui/react';

const CitationDetails = ({ getFieldValue }) => {
  return (
    <Box marginTop="0px" overflowX="auto">
      <Text fontSize="15px" fontWeight="bold" textColor="black">
        Citation Details
      </Text>
      <Table variant="simple" size="sl" textColor="black" border="1px solid black">
        <Thead>
          <Tr>
            {/* Add table headers here if needed */}
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td border="1px solid black" fontSize="12px">
              {getFieldValue("No. of citations of published papers as on dd/mm/yyyy (based on Google Scholar and Scopus)")}
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
};

export default CitationDetails;
