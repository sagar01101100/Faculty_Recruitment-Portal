import React from "react";
import { Box, Text, Wrap, WrapItem, VStack } from "@chakra-ui/react";

interface Field72ComponentProps {
  field72Data: string[];
}

const ListOfUploads: React.FC<Field72ComponentProps> = ({ field72Data }) => {
  return (
    <Box p={4} borderWidth={1} borderRadius="lg" bg="white" style={{ pageBreakInside: "avoid" }}>
      <VStack align="stretch" spacing={4} style={{ pageBreakInside: "avoid" }}>
        <Text fontSize="15px" fontWeight="bold" color="black">
          List of Uploads
        </Text> 

        <Wrap spacing={3}>
          {field72Data.map((doc, index) => (
            <WrapItem key={index} style={{ pageBreakInside: "avoid" }}>
              <Box
                bg="white"
                px={3}
                py={2}
                borderRadius="md"
                border="1px solid"
                _hover={{ bg: "gray.100", transition: "background-color 0.2s" }}
                whiteSpace="nowrap"
              >
                <Text fontSize="sl" fontWeight="medium" color="black">
                  {doc}
                </Text>
              </Box>
            </WrapItem>
          ))}
        </Wrap>

        {field72Data.length === 0 && (
          <Text fontSize="md" color="gray.500" fontStyle="italic">
            No documents uploaded yet.
          </Text>
        )}
      </VStack>
    </Box>
  );
};

export default ListOfUploads;
