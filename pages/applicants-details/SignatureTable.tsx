import React from 'react';
import { Box, Text, Table, Tbody, Tr, Td, Image } from '@chakra-ui/react';

const SignatureTable = ({ imageSrc, signImg }) => {
  return (
    <Box marginTop="0px">
      <Text fontSize="15px" fontWeight="bold" marginBottom="10px" textColor="black">
      </Text>
      <Box display="flex" justifyContent="flex-end" width="100%">
        <Table variant="simple" size="sm" textColor="black" border="1px solid black" width="50%">
          <Tbody>
            <Tr border="1px solid black">
              <Td border="1px solid black" textAlign="center">Applicant's Signature:</Td>
              <Td border="1px solid black" textAlign="center">
                {imageSrc && (
                  <Image 
                    src={signImg}
                    alt="Applicant Signature"
                    layout="responsive"
                    width={100}
                    height={50}
                    objectFit="cover"
                  />
                )}
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default SignatureTable;
