import React from 'react';
import { Box, Text, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

const WorkExperience = ({ workExperiences }) => {
  const formatDate = (date) => {
    // Format the date as needed, assuming date is in a valid Date format or a string.
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <Box marginTop="20px" overflowX="auto">
      <Text fontSize="15px" fontWeight="bold" textColor="black" marginBottom="10px">
        Work Experience
      </Text>
      <Table
        variant="simple"
        size="sl"
        textColor="black"
        marginBottom="10px"
        border="1px solid black"
        style={{ breakInside: 'avoid' }}
        style={{ tableLayout: 'fixed', width: '100%', fontSize: '6pt' }}
      >
        <Thead>
          <Tr border="1px solid black" fontSize="12px">
            <Th border="1px solid black" style={{ width: '16%' }}>ORGANISATION/INSTITUTE</Th>
            <Th border="1px solid black" style={{ width: '12%' }}>POSITION</Th>
            <Th border="1px solid black" style={{ width: '18%' }}>NATURE OF DUTIES</Th>
            <Th border="1px solid black" style={{ width: '10%' }}>DATE OF JOINING</Th>
            <Th border="1px solid black" style={{ width: '10%' }}>DATE OF LEAVING</Th>
            <Th border="1px solid black" style={{ width: '16%' }}>SCALE OF PAY</Th>
            <Th border="1px solid black" style={{ width: '18%' }}>REMARKS</Th>
          </Tr>
        </Thead>
        <Tbody>
          {workExperiences.map((experience, index) => (
            <Tr key={index} fontSize="12px">
              {experience.map((entry, i) => (
                <Td key={i} border="1px solid black" textAlign="center">
                  {(i === 4|| i === 3) ? formatDate(entry) : entry}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default WorkExperience;
