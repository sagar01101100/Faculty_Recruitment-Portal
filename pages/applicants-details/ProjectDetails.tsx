import React from 'react';
import { Box, Text, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

const ProjectDetails = ({ getFieldValue }) => {
  return (
    <Box marginTop="0px" overflowX="auto">
      <Text fontSize="15px" fontWeight="bold" marginBottom="1px" textColor="black">
        Teaching Experience
      </Text>
      <Table variant="simple" size="sl" textColor="black" border="1px" borderColor="black" marginBottom="10px">
        <Thead>
          <Tr border="1px" borderColor="black">
            <Th border="1px" borderColor="black">PG projects guided</Th>
            <Th border="1px" borderColor="black">No. of Projects involved in (Sponsored)</Th>
            <Th border="1px" borderColor="black">No. of Projects involved in (Consultancy)</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr border="1px" borderColor="black">
            <Td border="1px" borderColor="black" width="50%" fontSize="15px">{getFieldValue("No. of PG projects guided")}</Td>
            <Td border="1px" borderColor="black" fontSize="15px">{getFieldValue("No. of Projects involved in (Sponsored)")}</Td>
            <Td border="1px" borderColor="black" fontSize="15px">{getFieldValue("No. of Projects involved in (Consultancy)")}</Td>

          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
};

export default ProjectDetails;