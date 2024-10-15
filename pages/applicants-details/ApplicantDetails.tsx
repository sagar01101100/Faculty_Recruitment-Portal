import React from 'react';
import { Flex, Box, VStack, HStack, Text } from "@chakra-ui/react";

interface ApplicantDetailsProps {
  getFieldValue: (field: string) => string;
}

// Modified formatDate to handle missing date
function formatDate(dateString: string) {
  if (!dateString) return ''; // Return empty if date is not provided
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

const ApplicantDetails: React.FC<ApplicantDetailsProps> = ({ getFieldValue }) => {
  return (
    <Flex fontSize="15px">
      <Box flex="1" textColor="black">
        <VStack align="flex-start" spacing="5px">
          <Text fontSize="15px" fontWeight="bold" textColor="black">
            Applicant's Details
          </Text>
          <HStack>
            <Text fontWeight="bold">Candidate's Name:</Text>
            <Text fontWeight="bold" textTransform="uppercase">
              {getFieldValue("Full Name (in capital letters as per matriculation/passport record)")}
            </Text>
          </HStack>
          <HStack>
            <Text fontWeight="bold">Father's / Husband's Name:</Text>
            <Text>{getFieldValue("Father's/Husband's Name")}</Text>
          </HStack>
          <HStack>
            <Text fontWeight="bold">Mother's Name:</Text>
            <Text>{getFieldValue("Mother's Name")}</Text>
          </HStack>
          <Flex width="100%">
            <HStack flex="1">
              <Text fontWeight="bold">Date of Birth:</Text>
              <Text>
                {formatDate(getFieldValue('Date of Birth (Please upload true copy of certificate at "Additional Info" section of this form)')) || ''}
              </Text>
            </HStack>
            <HStack flex="1">
              <Text fontWeight="bold">Gender:</Text>
              <Text>{getFieldValue('Gender')}</Text>
            </HStack>
          </Flex>
          <HStack>
            <Text fontWeight="bold">Age as on closing date of advertisement:</Text>
            <Text>{getFieldValue("Age as on closing date of advertisement")}</Text>
          </HStack>
          <Flex width="100%">
            <HStack flex="1">
              <Text fontWeight="bold">Category:</Text>
              <Text>{getFieldValue('Category (Please upload true copy of certificate at "Additional Info" section of this form in case of SC/ST/OBC)')}</Text>
            </HStack>
            <HStack flex="1">
              <Text fontWeight="bold">Marital Status:</Text>
              <Text>{getFieldValue('Marital Status')}</Text>
            </HStack>
          </Flex>

          <Flex width="100%">
            <HStack flex="1">
              <Text fontWeight="bold">Citizen of India:</Text>
              <Text>{getFieldValue('Are you a citizen of India by birth or by domicile?')}</Text>
            </HStack>
            <HStack flex="1">
              <Text fontWeight="bold">PWD:</Text>
              <Text>{getFieldValue('Do you belong to the PWD category? (Please upload true copy of certificate at "Additional Info" section of this form)')}</Text>
            </HStack>
          </Flex>
        </VStack>

        <HStack>
          <Text fontWeight="bold">Permanent Address:</Text>
          <Text>{getFieldValue("Permanent Address")}</Text>
        </HStack>
        <HStack>
          <Text fontWeight="bold">Address for Correspondence:</Text>
          <Text>{getFieldValue("Address for Correspondence")}</Text>
        </HStack>

        <Flex width="100%">
          <HStack flex="1">
            <Text fontWeight="bold">PIN Code:</Text>
            <Text>{getFieldValue('Pin Code (for Correspondence Address)')}</Text>
          </HStack>
        </Flex>

        <Flex width="100%">
          <HStack flex="1">
            <Text fontWeight="bold">Mobile No:</Text>
            <Text>{getFieldValue('Mobile No. (including country code)')}</Text>
          </HStack>
          <HStack flex="1">
            <Text fontWeight="bold">Email:</Text>
            <Text>{getFieldValue('Email ID')}</Text>
          </HStack>
        </Flex>
      </Box>
    </Flex>
  );
};

export default ApplicantDetails;
