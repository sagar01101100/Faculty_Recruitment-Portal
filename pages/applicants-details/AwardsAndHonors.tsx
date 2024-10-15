import React from 'react';
import { Box, Text, Flex } from '@chakra-ui/react';

const AwardsAndHonors = ({ getFieldValue }) => {
  const awards = getFieldValue('Awards and honours (enter comma-separated entries)')?.split(',').map(award => award.trim());

  return (
    <Box marginTop="0px" marginBottom="10px">
      <Text fontSize="15px" fontWeight="bold" textColor="black">Awards and Honors</Text>
      <Flex direction="column" justifyContent="flex-start">
        {awards && awards.map((award, index) => (
          <Box
            key={index}
            color="black"
            px={1}
            py={0}
            borderRadius="md"
            my={1}
            width="100%"

          >
            <Text fontWeight="medium"  fontSize="12px">{award}</Text>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default AwardsAndHonors;
