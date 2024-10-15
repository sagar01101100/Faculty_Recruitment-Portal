import { GetServerSideProps } from "next";
import { useState, useEffect } from "react";
import prisma from "../../lib/prisma";
import { Box, Flex, Table, Thead, Tbody, Tr, Th, Td, Image, Text, VStack, HStack, Button } from "@chakra-ui/react";
import Head from "next/head";
import ResearchPublicationsTable from "../applicants-details/ResearchPublicationsTable";
import ApplicantDetails from "../applicants-details/ApplicantDetails";
import ReferencesTable from "../applicants-details/ReferencesTable";
import ThesisGuidedTable from "../applicants-details/ThesisGuidedTable";
import PostAppliedTable from "../applicants-details/PostAppliedTable";
import SignatureTable from "../applicants-details/SignatureTable";
import AwardsAndHonors from "../applicants-details/AwardsAndHonors";
import TeachingExperience from "../applicants-details/TeachingExperience";
import BooksPublished from "../applicants-details/BooksPublished";
import CitationDetails from "../applicants-details/CitationDetails";
import PatentDetails from "../applicants-details/PatentDetails";
import WorkExperience from "../applicants-details/WorkExperience";
import AcademicQualifications from "../applicants-details/AcademicQualifications";
import LogoHeader from "../applicants-details/LogoHeader";
import AdvertisementNumber from "../applicants-details/AdvertisementNumber";
import PostAppliedAndPhotograph from "../applicants-details/PostAppliedAndPhotograph";
import Recognition from "../applicants-details/Recognition";
import AppliedEarlier from "../applicants-details/AppliedEarlier";
import LegalProceeding from "../applicants-details/LegalProceeedig";
import PhDThesisDetails from "../applicants-details/PhDThesisDetails";
import TimeTakenToJoin from "../applicants-details/TimeTakenToJoin";
import ScaleOfPay from "../applicants-details/ScaleOfPay";
import Specialization from "../applicants-details/Specialization";
import DeclarationForm from "../applicants-details/DeclarationForm";
import request from "superagent"
import ListOfUploads from "../applicants-details/ListOfUploads";
import SnapshotId from "../applicants-details/ApplicationId";
import { useRouter } from "next/router";
import PublicationsSummary from "../applicants-details/PublicationsSummary";
import ProjectDetails from "../applicants-details/ProjectDetails";
import ApplicationId from "../applicants-details/ApplicationId";


const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};





export const getServerSideProps: GetServerSideProps = async (context) => {
  const snapshotId = context.query.snapshotId as string;
  const token = context.query.token as string

  // Fetch snapshot with its department and position
  const snapshot = await prisma.snapshot.findUnique({
    where: { id: snapshotId },
    select: {
      department: true,
      position: true,
    }
  });

  // Fetch fields and entries
  const fieldsData = await prisma.field.findMany({
    select: {
      title: true,
      Entry: {
        select: { content: true },
        where: { snapshotId: snapshotId },
      }
    }
  });

  const fields = fieldsData.map(field => ({
    title: field.title,
    Entry: field.Entry.length > 0 ? field.Entry[0].content : ''
  }));



  // Function to fetch entries for a given fieldId
  const fetchEntries = async (fieldId: number) => {
    const ids = await prisma.entry.findMany({
      where: {
        snapshotId: snapshotId,
        fieldId: fieldId
      },
      select: {
        id: true
      }
    });

    return Promise.all(
      ids.map(async ({ id }) => {
        const entries = await prisma.entry.findMany({
          where: {
            snapshotId: snapshotId,
            entryId: id
          },
          select: {
            content: true
          },
          orderBy: {
            id: 'asc'
          },
          take: 1000
        });
        return entries.map(entry => entry.content);
      })
    );
  };
  // console.log(`Number of entries for fieldId ${fieldId}:`, entries.length);

  // Fetch academic qualifications (fieldId: 3)
  const academicQualifications = await fetchEntries(3);

  // Fetch work experiences (fieldId: 7)
  const workExperiences = await fetchEntries(7);

  //Fetch  (Five) most important research publications 
  const impResPubs = await fetchEntries(65);



 // Fetch entries for fieldId 72
 const fetchField72Entries = async () => {
  const entries = await prisma.entry.findMany({
    where: {
      snapshotId: snapshotId,
      fieldId: 72
    },
    select: {
      id: true
    }
  });

  return Promise.all(
    entries.map(async ({ id }) => {
      const titleEntry = await prisma.entry.findFirst({
        where: {
          snapshotId: snapshotId,
          entryId: id,
          fieldId: 73  // This is the fieldId for "Title"
        },
        select: {
          content: true
        }
      });
      
      return titleEntry?.content || '';
    })
  );
};


 // Fetch data for specified fieldIds and check if the document is uploaded
 const fetchEntriesAndTitles = async (fieldIds: number[]) => {
  return Promise.all(
    fieldIds.map(async (fieldId) => {
      const entry = await prisma.entry.findFirst({
        where: {
          snapshotId: snapshotId,
          fieldId: fieldId,
          NOT: {
            content: ''
          }
        },
        select: {
          id: true
        }
      });

      if (entry) {
        const field = await prisma.field.findUnique({
          where: {
            id: fieldId
          },
          select: {
            title: true
          }
        });
        return field ? { title: field.title, fieldId: fieldId } : null;
      }
      return null;
    })
  ).then(results => results.filter(Boolean));
};

// Fetch data for specified fieldIds
const specifiedFieldsData = await fetchEntriesAndTitles([9, 110, 127, 63, 64, 75, 76, 86, 85, 44]);


// Levels of the fieldIds
const fieldLevels = {
  9: "Proof of Date of Birth",
  44: "Research Plan/ Teaching Plan/Vision and Mission for IIT Patna",
  63: "Research & Development / Industrial/Training experience",
  64: "Patent Lists",
  75: "Journal Publications",
  76: "Conference Publications",
  85: "Description of PhD Works",
  86: "Lab Experiences",
  110: "Photograph",
  127: "Signature"
};

// Create MandatoryDocuments array
const MandatoryDocuments = specifiedFieldsData.map(({ fieldId }) => fieldLevels[fieldId]);


  // Fetch the data for fieldId 72
  const field72Data = await fetchField72Entries();
 
  const allDocuments = [...MandatoryDocuments, ...field72Data];

  return {
    props: {
      fields,
      department: snapshot?.department || '',
      position: snapshot?.position || '',
      academicQualifications,
      workExperiences,
      impResPubs,
      snapshotId,
      allDocuments,
      
    }
  };
};




export default function PreviewPage(props: {
  fields: { title: string; Entry: string; }[];
  department: string;
  position: string;
  academicQualifications:   string[][];
  workExperiences: string[][];
  impResPubs: string[][];
  snapshotId: string;
  allDocuments : string[];  
}) {

  const router = useRouter();


  useEffect(() => {
    if (!localStorage.getItem("auth-token")) {
      router.replace("/")
    }
  })

  console.log("Number of qualifications:", props.academicQualifications.length);

  console.log("Academic Qualifications:", props.academicQualifications);

  console.log("field72Data:", props.field72Data);

  console.log("specifiedFieldsData",  props.allDocuments)

  const getFieldValue = (title: string) => {
    const field = props.fields.find(f => f.title === title);
    return field ? field.Entry : '';
  };



  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    const filename = getFieldValue('Passport Photo');
    if (filename) {
      setImageSrc(`/api/image/${encodeURIComponent(filename)}`);
    }
  }, []);

  const [signImg, setSign] = useState<string | null>(null);

  useEffect(() => {
    const filename = getFieldValue('Signature of Applicant');
    if (filename) {
      setSign(`/api/image/${encodeURIComponent(filename)}`);
    }
  }, []);


  const [birthCertificate, setbirthCertificate] = useState<string | null>(null);

  useEffect(() => {
    const filename = getFieldValue('Proof of Date of Birth (10th Certificate)');
    if (filename) {
      setbirthCertificate(`/api/pdf/${encodeURIComponent(filename)}`);
    }
  }, []);

  const [pdfImageSrc, setPdfImageSrc] = useState<string | null>(null);
  useEffect(() => {
    const filename = getFieldValue('Proof of Date of Birth (10th Certificate)');
    if (filename) {
      const pdfUrl = `/api/pdf/${encodeURIComponent(filename)}`;
      fetch(`/api/pdf-to-image?url=${encodeURIComponent(pdfUrl)}`)
        .then(response => response.blob())
        .then(blob => {
          const imageUrl = URL.createObjectURL(blob);
          setPdfImageSrc(imageUrl);  // Set the URL of the converted image here
        })
        .catch(error => console.error('Error fetching PDF image:', error));
    }
  }, []);


  return (
    <>

      <Head>
        <title>Applicant's Details</title>
      </Head>
      <Button onClick={async () => {
        const res = await request.post("/api/preview").set(
          "Authorization",
          `Bearer ${localStorage.getItem("auth-token")}`
        )
          .send({ snapshotId: props.snapshotId })
          console.log(res.body)
      }}>Generate PDF</Button>     

      <Box maxWidth="1000px" margin="auto" padding="20px" backgroundColor="white" fontSize="10px">
      {/* <ApplicationId
           dob = {getFieldValue('Date of Birth (Please upload true copy of certificate at "Additional Info" section of this form)')} 
           dept={props.department}
           pos = {props.position}
            /> */}

<ApplicationId
  dept={props.department}
  pos={props.position}
  dob={getFieldValue('Date of Birth (Please upload true copy of certificate at "Additional Info" section of this form)')}
  mobileNumber={getFieldValue('Mobile No. (including country code)')}
/>
        
        <LogoHeader />

        <AdvertisementNumber advertisementNumber={getFieldValue('Advt. No.')} />

        <PostAppliedAndPhotograph
          department={props.department}
          position={props.position}
          specialization={getFieldValue('Field of Specialization  ')}
          imageSrc={imageSrc}
        />

        <ApplicantDetails getFieldValue={getFieldValue} />


        <AcademicQualifications academicQualifications={props.academicQualifications} />


        <WorkExperience workExperiences={props.workExperiences} />
        <ReferencesTable getFieldValue={getFieldValue} numberOfReferences={3} />

        <PhDThesisDetails getFieldValue={getFieldValue} />

        <ThesisGuidedTable getFieldValue={getFieldValue} />

        <ProjectDetails getFieldValue={getFieldValue} />

        <PatentDetails getFieldValue={getFieldValue} />

        <CitationDetails getFieldValue={getFieldValue} />

        <ResearchPublicationsTable publications={props.impResPubs} />

        <PublicationsSummary getFieldValue={getFieldValue}/>

        <Specialization getFieldValue={getFieldValue} />

        <AppliedEarlier getFieldValue={getFieldValue} />

        <TimeTakenToJoin getFieldValue={getFieldValue} />

        <ScaleOfPay getFieldValue={getFieldValue} />

        <TeachingExperience getFieldValue={getFieldValue} />

        <BooksPublished getFieldValue={getFieldValue} />

        <Recognition getFieldValue={getFieldValue} />

        <LegalProceeding getFieldValue={getFieldValue} />

        <ListOfUploads field72Data={props.allDocuments} />

        <AwardsAndHonors getFieldValue={getFieldValue} />

        <SignatureTable imageSrc={imageSrc} signImg={signImg} />

        <DeclarationForm getFieldValue={getFieldValue} imageSrc={imageSrc} signImg={signImg} />



      </Box>
    </>
  );
}


