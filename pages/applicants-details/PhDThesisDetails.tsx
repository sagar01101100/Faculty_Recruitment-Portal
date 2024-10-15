import React from 'react';
import { Box, Text, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

const PhDThesisDetails = ({ getFieldValue }) => {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <Box marginTop="10px" overflowX="auto">
      <Text fontSize="15px" fontWeight="bold" marginBottom="10px" textColor="black">
        PhD Thesis Details
      </Text>
      <Table variant="simple" size="sl" textColor="black" border="1px" borderColor="black" marginBottom="10px" marginTop="10px">
        <Thead>
          <Tr border="0px" borderColor="black">
          </Tr>
        </Thead>
        <Tbody>
          <Tr border="1px" borderColor="black" fontSize="12px">
            <Td border="1px" borderColor="black" width="25%">Title of your Ph. D. Thesis</Td>
            <Td border="1px" borderColor="black">{getFieldValue("Title of your Ph. D. Thesis")}</Td>
          </Tr>
          <Tr border="1px" borderColor="black" fontSize="12px">
            <Td border="1px" borderColor="black">Name of your Ph.D. Supervisor</Td>
            <Td border="1px" borderColor="black">{getFieldValue("Name of your Ph.D. Supervisor")}</Td>
          </Tr>
          <Tr border="1px" borderColor="black"  fontSize="12px">
            <Td border="1px" borderColor="black">Name of your Co-Supervisor</Td>
            <Td border="1px" borderColor="black">{getFieldValue("Name of your Co-Supervisor")}</Td>
          </Tr>
          <Tr border="1px" borderColor="black"  fontSize="12px">
            <Td border="1px" borderColor="black">Date of thesis submission</Td>
            <Td border="1px" borderColor="black">{formatDate(getFieldValue("Date of thesis submission"))}</Td>
          </Tr>
          <Tr border="1px" borderColor="black"  fontSize="12px">
            <Td border="1px" borderColor="black">Date of viva-voce</Td>
            <Td border="1px" borderColor="black">{formatDate(getFieldValue("Date of viva-voce"))}</Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
};

export default PhDThesisDetails;