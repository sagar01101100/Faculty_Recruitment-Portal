// import React from 'react';
// import { Box, Text, Input, Textarea, Flex, VStack, HStack, Divider , Image} from '@chakra-ui/react';
// import preview from '../[snapshotId]/preview';
// import AdvertisementNumber from './AdvertisementNumber';
// import LogoHeader from './LogoHeader';
// import SignatureTable from './SignatureTable';


// const DeclarationForm = ({getFieldValue, imageSrc, signImg, submissionDate}) => {
//   return (
//     <>
     
//     <Box maxWidth="900px" margin="auto" border="1px solid black" p={4} marginTop="50px"  style={{ breakInside: 'avoid' }}>

//     <LogoHeader/>

//     <AdvertisementNumber advertisementNumber={getFieldValue('Advt. No.')} />
      
      
//       <Box mb={4}>
//         <Text fontWeight="bold" mb={2} textColor="black" fontSize="15px">Declaration</Text>
//         <Text fontSize="12px" textColor="black">
//           I hereby declare that I have carefully read and understood the instructions attached to the advertisement as available on Patna website and
//           that all the entries in this form are true to the best of my knowledge and belief. I also declare that I have not concealed any material information
//           which may debar my candidature for the post applied for. In the event of suppression or distortion of any fact like category or educational
//           qualification etc. made in my application form, I understand that I will be denied any employment in the Institute and if already employed on any of
//           the post in the Institute, my services will be summarily terminated forthwith without notice or compensation.
//         </Text>
//       </Box>
      
//       <Flex justifyContent="space-between" mb={4} textColor="black">
//         <VStack align="flex-start">
//         </VStack>
//         <VStack align="flex-end" paddingRight="50px">
//           {imageSrc && (
//                   <Image 
//                     src={signImg}
//                     alt="Applicant Signature"
//                     layout="responsive"
//                     width={100}
//                     height={50}
//                     objectFit="cover"
//                   />
//                 )}
//                 <Text>Dated: {new Date(submissionDate).toLocaleDateString()}</Text> 
//           <Box borderBottom="1px solid black" width="200px" height="40px" />

//           <Text>(Signature of the Applicant with Date)</Text>
//         </VStack>
//       </Flex>
      
//       <Divider my={4} />
      
//       <Flex textColor="black">
//         <VStack align="flex-start" width="50%">
//           <Text>Place:</Text>
//           <Text>Dated:</Text>
//           <Text>Telephone:</Text>
//           <Text>Fax:</Text>
//           <Text>Email:</Text>
//         </VStack>
//         <VStack align="flex-start" width="50%">
//           <Text>Signature:</Text>
//           <Text>(Head of the Institution/Organization)</Text>
//           <Text>Designation:</Text>
//           <Text>Address:</Text>
//         </VStack>
//       </Flex>
      
//       <Box mt={4} textColor="black">
//         <Text fontWeight="bold">Remarks:</Text>
//         <Text></Text>
//       </Box>
//     </Box>

//     </>
//   );
// };

// export default DeclarationForm;



import React from 'react';
import { Box, Text, Input, Textarea, Flex, VStack, HStack, Divider, Image } from '@chakra-ui/react';
import AdvertisementNumber from './AdvertisementNumber';
import LogoHeader from './LogoHeader';

const DeclarationForm = ({ getFieldValue, imageSrc, signImg, submissionDate }) => {
	const formattedDate = new Date(submissionDate).toLocaleDateString();

	return (
		<Box maxWidth="900px" margin="auto" border="1px solid black" p={4} marginTop="50px" style={{ breakInside: 'avoid' }}>
			<LogoHeader />
			<AdvertisementNumber advertisementNumber={getFieldValue('Advt. No.')} />
			<Box mb={4}>
				<Text fontWeight="bold" mb={2} textColor="black" fontSize="15px">Declaration</Text>
				<Text fontSize="12px" textColor="black">
					I hereby declare that I have carefully read and understood the instructions attached to the advertisement as available on Patna website and
					that all the entries in this form are true to the best of my knowledge and belief. I also declare that I have not concealed any material information
					which may debar my candidature for the post applied for. In the event of suppression or distortion of any fact like category or educational
					qualification etc. made in my application form, I understand that I will be denied any employment in the Institute and if already employed on any of
					the post in the Institute, my services will be summarily terminated forthwith without notice or compensation.
				</Text>
			</Box>
			<Flex justifyContent="space-between" mb={4} textColor="black">
				<VStack align="flex-start">
				</VStack>
				<VStack align="flex-end" paddingRight="50px">
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
					{/* <Text>Dated: {formattedDate}</Text> */}
					<Box borderBottom="1px solid black" width="200px" />
					<Text>(Signature of the Applicant with Date)</Text>
				</VStack>
			</Flex>
			<Divider my={4} />
			<Flex textColor="black">
				<VStack align="flex-start" width="50%">
					<Text>Place:</Text>
					<Text>Dated:</Text>
					<Text>Telephone:</Text>
					<Text>Fax:</Text>
					<Text>Email:</Text>
				</VStack>
				<VStack align="flex-start" width="50%">
					<Text>Signature:</Text>
					<Text>(Head of the Institution/Organization)</Text>
					<Text>Designation:</Text>
					<Text>Address:</Text>
				</VStack>
			</Flex>
			<Box mt={4} textColor="black">
				<Text fontWeight="bold">Remarks:</Text>
				<Text></Text>
			</Box>
		</Box>
	);
};

export default DeclarationForm;
