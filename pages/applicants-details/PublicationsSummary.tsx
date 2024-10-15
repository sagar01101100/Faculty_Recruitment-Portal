import React from 'react';
import { Box, Text, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

interface PublicationsSummaryProps {
  getFieldValue: (title: string) => string;
}

const PublicationsSummary: React.FC<PublicationsSummaryProps> = ({ getFieldValue }) => {
  return (
    <Box marginTop="0px" overflowX="auto" className="avoid-break">
      <Text fontSize="15px" fontWeight="bold" textColor="black" marginBottom="5px">
        Publications Summary
      </Text>
      <Table
        variant="simple"
        size="12px"
        textColor="black"
        border="1px solid black"
        marginBottom="10px"
        style={{ tableLayout: 'fixed', width: '100%', fontSize: '8pt' }}
      >
        <Thead>
          <Tr border="1px solid black">
            <Th colSpan={2} textAlign="center" border="1px solid black" style={{ width: '28%' }}>
              No. In Journal
            </Th>
            <Th colSpan={4} textAlign="center" border="1px solid black" style={{ width: '56%' }}>
              No. In Conferences
            </Th>
            <Th rowSpan={3} textAlign="center" border="1px solid black" style={{ width: '16%' }}>
              Technical Reports
            </Th>
          </Tr>
          <Tr border="1px solid black">
            <Th colSpan={1} textAlign="center" border="1px solid black">Int'l</Th>
            <Th colSpan={1} textAlign="center" border="1px solid black">Nat'l</Th>
            <Th colSpan={2} textAlign="center" border="1px solid black">Referred</Th>
            <Th colSpan={2} textAlign="center" border="1px solid black">Unreferred</Th>
          </Tr>
          <Tr border="1px solid black">
            <Th textAlign="center" border="1px solid black"></Th>
            <Th textAlign="center" border="1px solid black"></Th>
            <Th textAlign="center" border="1px solid black">Int'l</Th>
            <Th textAlign="center" border="1px solid black">Nat'l</Th>
            <Th textAlign="center" border="1px solid black">Int'l</Th>
            <Th textAlign="center" border="1px solid black">Nat'l</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr border="1px solid black">
            <Td textAlign="center" border="1px solid black">{getFieldValue('No. of publications in journals (refereed, international)')}</Td>
            <Td textAlign="center" border="1px solid black">{getFieldValue('No. of publications in journals (refereed, national)')}</Td>
            <Td textAlign="center" border="1px solid black">{getFieldValue('No. of publications in conferences (refereed, international)')}</Td>
            <Td textAlign="center" border="1px solid black">{getFieldValue('No. of publications in conferences (refereed, national)')}</Td>
            <Td textAlign="center" border="1px solid black">{getFieldValue('No. of publications in conferences (un-refereed, international)')}</Td>
            <Td textAlign="center" border="1px solid black">{getFieldValue('No. of publications in conferences (un-refereed, national)')}</Td>
            <Td textAlign="center" border="1px solid black">{getFieldValue('No. of technical reports')}</Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
};

export default PublicationsSummary;
