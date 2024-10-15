// components/AcademicQualifications.tsx

import React from 'react';
import { Box, Text, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

interface AcademicQualificationsProps {
  academicQualifications: string[][];
}

const AcademicQualifications: React.FC<AcademicQualificationsProps> = ({ academicQualifications }) => {
  const formatDate = (date: string) => {
    // Format the date as needed, assuming date is in a valid Date format or a string.
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <Box
      marginTop="20px"
      overflowX="auto"
      style={{ breakInside: 'avoid' }}
    >
      <Text fontSize="15px" fontWeight="bold" textColor="black" marginBottom="10px">
        Academic Qualifications
      </Text>
      <Table
        variant="simple"
        size="15px"
        textColor="black"
        border="1px solid black"
        style={{ tableLayout: 'fixed', width: '100%', fontSize: '6pt' }}
      >
        <Thead>
          <Tr border="1px solid black" style={{ lineHeight: '1.2em' }} fontSize="12px">
            <Th border="1px solid black" style={{ width: '12%'}}>School/INSTITUTE</Th>
            <Th border="1px solid black" style={{ width: '8%' }}>DATE OF ENTRY</Th>
            <Th border="1px solid black" style={{ width: '8%' }}>DATE OF LEAVING</Th>
            <Th border="1px solid black" style={{ width: '14%' }}>BOARD/UNIV.</Th>
            <Th border="1px solid black" style={{ width: '14%' }}>EXAM/DEGREE</Th>
            <Th border="1px solid black" style={{ width: '12%' }}>DIVISION</Th>
            <Th border="1px solid black" style={{ width: '14%' }}>SUBJECTS</Th>
            <Th border="1px solid black" style={{ width: '10%' }}>PERCENTAGE/CPI</Th>
            <Th border="1px solid black" style={{ width: '8%' }}>YEAR OF PASSING</Th>
          </Tr>
        </Thead>
        <Tbody>
          {academicQualifications && academicQualifications.map((qualification, index) => (
            <Tr key={index} style={{ lineHeight: '1.2em' }} fontSize="12px">
              {qualification.map((entry, i) => (
                <Td key={i} border="1px solid black" textAlign="center">
                  {(i === 1 || i === 2) ? formatDate(entry) : entry}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default AcademicQualifications;