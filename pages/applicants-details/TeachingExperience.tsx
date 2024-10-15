import React from 'react';
import { Box, Text, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

const TeachingExperience = ({ getFieldValue }) => {
  return (
    <Box marginTop="0px" overflowX="auto">
      <Text fontSize="15px" fontWeight="bold" marginBottom="1px" textColor="black">
        Teaching Experience
      </Text>
      <Table variant="simple" size="sl" textColor="black" border="1px" borderColor="black" marginBottom="10px">
        <Thead>
          <Tr border="1px" borderColor="black">
            <Th border="1px" borderColor="black">No. of Different Courses Taught</Th>
            <Th border="1px" borderColor="black">No. of Years</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr border="1px" borderColor="black">
            <Td border="1px" borderColor="black" width="50%" fontSize="15px">{getFieldValue("No of courses taught")}</Td>
            <Td border="1px" borderColor="black" fontSize="15px">{getFieldValue("Teaching Experience (in years)")}</Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
};

export default TeachingExperience;