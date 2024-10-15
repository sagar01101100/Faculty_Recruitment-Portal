import React from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

interface PostAppliedTableProps {
  department: string;
  position: string;
  specialization: string;
}

const PostAppliedTable: React.FC<PostAppliedTableProps> = ({ department, position, specialization }) => {
  return (
    <Box 
      textColor="black" 
      fontWeight="bold" 
      fontSize="15px" 
      textAlign="left"
    >
      Post Applied

      <Table variant="simple" textColor="black" border="1px solid black" fontSize="10px" overflowX="auto" fontSize="12px">
        <Thead>
          <Tr>
            <Th border="1px solid black">Department</Th>
            <Th border="1px solid black">Position</Th>
            <Th border="1px solid black">Specialization</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td border="1px solid black">{department}</Td>
            <Td border="1px solid black">{position}</Td>
            <Td border="1px solid black">{specialization}</Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
};

export default PostAppliedTable;