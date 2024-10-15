// import React from 'react';
// import { Box, Text } from '@chakra-ui/react';

// // Function to get short form of department
// const getShortDepartment = (department): string => {
//   console.log('Dept: ', department.name);
//   switch (department.name) {
//     case "Computer Science and Engineering":
//       return "CS";
//     case "Chemical & Biochemical Engineering":
//       return "CB";
//     case "Chemistry":
//       return "CH";
//     case "Civil & Environmental Engineering":
//       return "CE";
//     case "Electrical Engineering":
//       return "EE";
//     case "Humanities and Social Sciences":
//       return "HS";
//     case "Metallurgical and Materials Engineering":
//       return "MM";
//     case "Mathematics":
//       return "MA";
//     case "Mechanical Engineering":
//       return "ME";
//     case "Physics":
//       return "PH";
//     default:
//       return "XX";
//   }
// };

// // Function to get position code
// const getPositionCode = (position)=> {
//   console.log('Position: ', position.name)
//   switch (position.name) {
//     case "Assistant Professor":
//       return "01";
//     case "Associate Professor":
//       return "10";
//     case "Professor":
//       return "11";
//     default:
//       return "00";
//   }
// };

// // Function to format date as yyyy
// const formatDate = (dateString) => {
//   const date = new Date(dateString);
//   return date.getFullYear().toString();
// };




// const getLast4Digits = (mobileNumber) => {
//   return mobileNumber.slice(-4);
// };

// export const generateApplicationId = (dept, pos, dob, mobileNumber) => {
//   const departmentShort = getShortDepartment(dept);
//   const positionCode = getPositionCode(pos);
//   const formattedDOB = formatDate(dob);
//   const last4Digits = getLast4Digits(mobileNumber);
//   return `${departmentShort}${positionCode}${formattedDOB}${last4Digits}`;
// };

// // You can keep the React component if needed
// const ApplicationId = ({ dept, pos, dob, mobileNumber  }) => {
//   const applicationId = generateApplicationId(dept, pos, dob, mobileNumber);
//   return (
//     <>
//       <Box backgroundColor="white" marginBottom="20px" textAlign="center" padding="10px">
//       <Text color="black" fontWeight="bold" fontSize="15px">
//       Application ID: {applicationId}    </Text>
//   </Box>
//     </>
//   );
// };



// export default ApplicationId;

import React from 'react';
import { Box, Text } from '@chakra-ui/react';

// Function to get short form of department
const getShortDepartment = (department): string => {
  console.log('Dept: ', department.name);
  switch (department.name) {
    case "Computer Science and Engineering":
      return "CS";
    case "Chemical & Biochemical Engineering":
      return "CB";
    case "Chemistry":
      return "CH";
    case "Civil & Environmental Engineering":
      return "CE";
    case "Electrical Engineering":
      return "EE";
    case "Humanities and Social Sciences":
      return "HS";
    case "Metallurgical and Materials Engineering":
      return "MM";
    case "Mathematics":
      return "MA";
    case "Mechanical Engineering":
      return "ME";
    case "Physics":
      return "PH";
    default:
      return "XX";
  }
};

// Function to get position code
const getPositionCode = (position): string => {
  console.log('Position: ', position.name);
  switch (position.name) {
    case "Assistant Professor":
      return "01";
    case "Associate Professor":
      return "10";
    case "Professor":
      return "11";
    default:
      return "00";
  }
};

// Function to format date as yyyy
const formatDate = (dateString): string => {
  const date = new Date(dateString);
  return date.getFullYear().toString();
};

// Function to get the last 4 digits of the mobile number
const getLast4Digits = (mobileNumber): string => {
  return mobileNumber.slice(-4);
};

// Function to generate application ID
export const generateApplicationId = (dept, pos, dob, mobileNumber): string => {
  if (!dob) {
    return '';  // Return an empty string if the date of birth is missing
  }
  const departmentShort = getShortDepartment(dept);
  const positionCode = getPositionCode(pos);
  const formattedDOB = formatDate(dob);
  const last4Digits = getLast4Digits(mobileNumber);
  return `${departmentShort}${positionCode}${formattedDOB}${last4Digits}`;
};

// React component for displaying the Application ID
const ApplicationId = ({ dept, pos, dob, mobileNumber }) => {
  const applicationId = generateApplicationId(dept, pos, dob, mobileNumber);
  return (
    <>
      <Box backgroundColor="white" marginBottom="20px" textAlign="center" padding="10px">
        <Text color="black" fontWeight="bold" fontSize="15px">
          Application ID: {applicationId ? applicationId : '**********'}
        </Text>
      </Box>
    </>
  );
};

export default ApplicationId;


