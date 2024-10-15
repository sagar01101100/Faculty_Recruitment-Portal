// import React from 'react';
// import { Flex, Box, Image } from "@chakra-ui/react";
// import PostAppliedTable from "./PostAppliedTable";

// interface ApplicantHeaderInfoProps {
//   department: string;
//   position: string;
//   specialization: string;
//   imageSrc: string | null;
// }

// const PostAppliedAndPhotograph : React.FC<ApplicantHeaderInfoProps> = ({
//   department,
//   position,
//   specialization,
//   imageSrc
// }) => {
//   return (
//     <Flex justifyContent="space-between" alignItems="flex-start">
//       <Box flex="1" marginRight="20px" fontSize="10px">
//         <PostAppliedTable 
//           department={department}
//           position={position}
//           specialization={specialization}
//         />
//       </Box>

//       <Box width="120px" height="120px" border="1px solid black" overflow="hidden">
//         {imageSrc && (
//           <Image 
//             src={imageSrc}
//             alt="Applicant Photo"
//             width={120}
//             height={120}
//             objectFit="cover"
//           />
//         )}
//       </Box>
//     </Flex>
//   );
// };

// export default PostAppliedAndPhotograph;





import React from 'react';
import { Flex, Box, Image } from "@chakra-ui/react";
import PostAppliedTable from "./PostAppliedTable";

interface ApplicantHeaderInfoProps {
  department: { id: string; name: string };
  position: { id: string; name: string };
  specialization: string;
  imageSrc: string | null;
}

const PostAppliedAndPhotograph: React.FC<ApplicantHeaderInfoProps> = ({
  department,
  position,
  specialization,
  imageSrc
}) => {
  return (
    <Flex justifyContent="space-between" alignItems="flex-start">
      <Box flex="1" marginRight="20px" fontSize="10px">
        <PostAppliedTable 
          department={department.name}
          position={position.name}
          specialization={specialization}
        />
      </Box>

      <Box width="120px" height="120px" border="1px solid black" overflow="hidden">
        {imageSrc && (
          <Image 
            src={imageSrc}
            alt="Applicant Photo"
            width={120}
            height={120}
            objectFit="cover"
          />
        )}
      </Box>
    </Flex>
  );
};

export default PostAppliedAndPhotograph;