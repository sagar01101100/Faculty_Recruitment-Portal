import React from 'react';
import { Box, Text, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

interface ResearchPublicationsTableProps {
  publications: string[][];
}

const ResearchPublicationsTable: React.FC<ResearchPublicationsTableProps> = ({ publications }) => {
  return (
    <Box marginTop="20px" overflowX="auto">
      <Text fontSize="15px" fontWeight="bold" textColor="black" marginBottom="10px">
        Research Publications
      </Text>
      <Table variant="simple" size="sl" textColor="black" border="1px solid black" marginBottom="10px" fontSize="12px">
        <Thead>
          <Tr>
            <Th border="1px solid black">YEAR, VOL. NO. PAGE</Th>
            <Th border="1px solid black">AUTHORS </Th>
            <Th border="1px solid black">TITLE OF THE RESEARCH PAPER</Th>
            <Th border="1px solid black">JOURNAL/CONFERENCE</Th>
            <Th border="1px solid black">H- INDEX AND/OR CORE RANK</Th>
            <Th border="1px solid black">IMPACT FACTOR</Th>
          </Tr>
        </Thead>
        <Tbody>
          {publications.map((publication, index) => (
            <Tr key={index}  fontSize="12px">
              {publication.map((entry, i) => (
                <Td key={i} border="1px solid black">{entry}</Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default ResearchPublicationsTable;