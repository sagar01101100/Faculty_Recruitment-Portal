--
-- PostgreSQL database cluster dump
--

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Databases
--

--
-- Database "template1" dump
--

\connect template1

--
-- PostgreSQL database dump
--

-- Dumped from database version 14.10
-- Dumped by pg_dump version 14.10

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- PostgreSQL database dump complete
--

--
-- Database "dhushyanth" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 14.10
-- Dumped by pg_dump version 14.10

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: dhushyanth; Type: DATABASE; Schema: -; Owner: dhushyanth
--

CREATE DATABASE dhushyanth WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.UTF-8';


ALTER DATABASE dhushyanth OWNER TO dhushyanth;

\connect dhushyanth

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- PostgreSQL database dump complete
--

--
-- Database "iitp_automation" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 14.10
-- Dumped by pg_dump version 14.10

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: iitp_automation; Type: DATABASE; Schema: -; Owner: dhushyanth
--

CREATE DATABASE iitp_automation WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.UTF-8';


ALTER DATABASE iitp_automation OWNER TO dhushyanth;

\connect iitp_automation

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: Admin; Type: TABLE DATA; Schema: public; Owner: dhushyanth
--

COPY public."Admin" (id, name, email, password, salt) FROM stdin;
ckzhwltti0111pb7optnxokx9	Admin Test	admin@iitp.ac.in	$argon2i$v=19$m=4096,t=3,p=1$el8iCXajN8fpFDXxBiwDRA$oCRPdSTpF/Rfbq3lip582KbqpMvhQ9Mu7p2TmcaPN84	18ff6bc2be2866e866b3832ca4e7cd5b
ckzi45o410741a97ok0yik1bu	admin1	admin1@iitp.ac.in	$argon2i$v=19$m=4096,t=3,p=1$drmNx3lAtUcrLtn+cpGQnQ$fpvgbDy2RxbZXim7qbfpw9FEnM1AopT1HXuNWzw8wQ8	4fe068aab29e805d42897e9d1f64247c
ckzi4eb2f0865a97oaqzj2khr	Admin2	admin2@iitp.ac.in	$argon2i$v=19$m=4096,t=3,p=1$PS31LqIRbdbx2L1iH3Z33A$vkdflyya6NJirW/Nh2oIiwAgb+BXGiovt93kPR0HM+I	77e43c95b83730715a42a1302450efd5
\.


--
-- Data for Name: Department; Type: TABLE DATA; Schema: public; Owner: dhushyanth
--

COPY public."Department" (id, name) FROM stdin;
ckzmnssxs0089tj7oz7gvoecf	Computer Science and Engineering
ckzmnu4ro0139tj7ou14q6qqu	Chemical & Biochemical Engineering
ckzmnu4rp0141tj7odrqla7lf	Chemistry
ckzmnu4rp0143tj7ods6ib3b2	Civil & Environmental Engineering
ckzmnu4rp0145tj7objlpbi9s	Electrical Engineering
ckzmnu4rp0147tj7o4r9a3ksu	Humanities and Social Sciences
ckzmnucha0198tj7of9jykypa	Materials Science & Engineering
ckzmnukd10221tj7otvksunfi	Mathematics
ckzmnuvop0244tj7ow075yh7h	Mechanical Engineering
ckzmnuvop0246tj7ou273ik2y	Physics
\.


--
-- Data for Name: FieldGroup; Type: TABLE DATA; Schema: public; Owner: dhushyanth
--

COPY public."FieldGroup" (id, title, description) FROM stdin;
1	Biodata	\N
2	Education & Employment	\N
3	Projects / Publications	\N
4	Teaching experience	\N
5	Awards and recognitions	\N
6	Additional Info	\N
\.


--
-- Data for Name: Field; Type: TABLE DATA; Schema: public; Owner: dhushyanth
--

COPY public."Field" (id, title, description, type, choices, "fieldId", "fieldGroupId", "allowFile", "templateFieldName", "isRequired", "maxLength", placeholder) FROM stdin;
55	Advt. No.	\N	string	{}	\N	1	f	advtNo	t	\N	\N
41	No. of publications in conferences (un-refereed, national)	\N	number	{}	\N	3	f	pubInCUnrefNat	t	\N	\N
40	No. of publications in conferences (refereed, national)	\N	number	{}	\N	3	f	pubInCRefNat	t	\N	\N
4	School/College/Institute	\N	string	{}	3	\N	f	schoolColInsti	t	\N	\N
57	Field of specialisation	\N	string	{}	\N	1	f	fieldOfSpecialisation	t	\N	\N
38	No. of publications in journals (refereed, national)	\N	number	{}	\N	3	f	pubInJNat	t	\N	\N
39	No. of publications in journals (refereed, international)	\N	number	{}	\N	3	f	pubInJInternat	t	\N	\N
42	No. of technical reports	\N	number	{}	\N	3	f	numTechnicalReports	t	\N	\N
43	No. of citations of published papers	\N	number	{}	\N	3	f	numCitations	t	\N	\N
2	Date of Birth	\N	date	{}	\N	1	f	dateOfBirth	t	\N	\N
58	Are you a citizen of India by birth or by domicile?	\N	select	{"By birth","By domicile"}	\N	1	f	citizenByBirthDomicile	t	\N	\N
54	Post applied for	\N	string	{}	\N	\N	f	postApplied	t	\N	\N
13	Permanent Address	\N	textarea	{}	\N	1	f	address	t	\N	\N
5	Date of entry	\N	date	{}	3	\N	f	eduEntryDate	t	\N	\N
17	Date of leaving	\N	date	{}	3	\N	f	eduExitDate	t	\N	\N
18	Board/University/Institution	\N	string	{}	3	\N	f	boardUniInsti	t	\N	\N
19	Exam/Degree/Diploma passed	\N	string	{}	3	\N	f	examDegree	t	\N	\N
28	Last pay & scale of pay	\N	string	{}	7	\N	f	lastPayAndScale	t	\N	\N
16	Email ID	\N	string	{}	\N	1	f	email	t	\N	\N
20	Distinction/Class/Division	\N	string	{}	3	\N	f	distClassDiv	t	\N	\N
21	Subjects	\N	string	{}	3	\N	f	eduSubjects	t	\N	\N
22	Percentage of marks/ CPI	\N	string	{}	3	\N	f	cpi	t	\N	\N
24	Position held	\N	string	{}	7	\N	f	positionHeld	t	\N	\N
44	Research plan for IIT Patna	\N	textarea	{}	\N	6	t	\N	t	\N	\N
7	Employment	\N	table	{}	\N	2	f	employment	t	\N	\N
29	Additional remarks	\N	string	{}	7	\N	f	empAdditionalRemarks	t	\N	\N
30	Father's/Husband's Name	\N	string	{}	\N	1	f	fatherName	t	\N	\N
47	Birth Certficate	\N	checklist	{}	\N	\N	f	\N	t	\N	\N
48	10TH Certificate	\N	checklist	{}	\N	\N	f	\N	t	\N	\N
27	Date of leaving	\N	date	{}	7	\N	f	empDateOfLeaving	t	\N	\N
26	Date of joining	\N	date	{}	7	\N	f	empDateOfJoining	t	\N	\N
25	Nature of duties/ work	\N	string	{}	7	\N	f	natureOfWork	t	\N	\N
23	Year of Passing	\N	number	{}	3	\N	f	yearOfPassing	t	\N	\N
10	Gender	\N	select	{Male,Female,Other}	\N	1	f	gender	t	\N	\N
3	Education	\N	table	{}	\N	2	f	education	t	\N	\N
32	No. of PG projects guided	\N	number	{}	\N	3	f	noPgProjects	t	\N	\N
8	Organisation/Institute	\N	string	{}	7	\N	f	orgInsti	t	\N	\N
33	No. of Ph.D. thesis guided (completed)	\N	number	{}	\N	3	f	phdThesisCompleted	t	\N	\N
59	Category	\N	select	{SC,ST,OBC,EWS,General}	\N	1	f	category	t	\N	\N
53	No of courses taught	\N	number	{}	\N	4	f	numCoursesTaught	t	\N	\N
14	Address for Correspondence	\N	textarea	{}	\N	1	f	correspondenceAddress	t	\N	\N
34	No. of Ph.D. thesis guided (ongoing)	\N	number	{}	\N	3	f	phdThesisOngoing	t	\N	\N
35	No. of Projects involved in (Sponsored)	\N	number	{}	\N	3	f	projectsSponsored	t	\N	\N
36	No. of Projects involved in (Consultancy)	\N	number	{}	\N	3	f	projectsConsultancy	t	\N	\N
37	No. of patents	\N	number	{}	\N	3	f	noOfPatents	t	\N	\N
56	Department	\N	string	{}	\N	\N	f	department	t	\N	\N
65	Your 5 (Five) most important research publications	*Impact Factor Source: Journal Citation Reports (JCR, Thomson Reuters-Clarivate analytics) for the year 2019  ** H Index Source: SCImago (https://www.scimagojr.com)  ***H-5 Index Source: https://scholar.google.com/citations?view_op=top_venues  ****Core-rank (journal): http://portal.core.edu.au/jnl-ranks/  ****Core-rank (conference): http://portal.core.edu.au/conf-ranks/	table	{}	\N	3	f	importantResearchPubs	t	\N	\N
50	No. of publications in conferences (refereed, international)	\N	number	{}	\N	3	f	pubInCRefInternat	t	\N	\N
51	No. of publications in conferences (un-refereed, international)	\N	number	{}	\N	3	f	pubInCUnrefInternat	t	\N	\N
63	Please attach a single document containing a list of your Research & Development / Industrial/Training experience	\N	none	{}	\N	3	t	researchExpAttached	t	\N	\N
64	Complete list of Patents using the format provided in ANNEXURE A	\N	none	{}	\N	3	t	completedPatentsListAttached	t	\N	\N
1	Full Name	\N	string	{}	\N	1	f	fullName	t	\N	\N
9	Proof of Date of Birth (10th Certificate)	\N	none	{}	\N	1	t	birthCert	t	\N	\N
11	Marital Status	\N	select	{Single,Married,Widowed,Divorced}	\N	1	f	maritalStatus	t	\N	\N
52	Teaching Experience (in years)	\N	number	{}	\N	4	f	yearsTeaching	t	\N	\N
15	Pin Code (for correspondence address)	\N	number	{}	\N	1	f	\N	t	\N	\N
12	Referral	For previous referral status, check home page. Minimum 3 required.	referral	{}	\N	6	f	\N	t	\N	\N
111	\t If the appointment is offered, how much time would you need before joining the post?	\N	string	{}	\N	1	f	timeTillJoin	t	\N	\N
61	If you are employed, please state your present basic pay and scale of pay	Ex: 4,00,000 scale: 2% increment per financial year	string	{}	\N	1	f	basePay	f	\N	\N
45	Mobile No.	(Include county code, ex: +91)	string	{}	\N	1	f	phone	t	\N	\N
69	Year, Vol. No. Page	\N	string	{}	65	\N	f	yearVolNoPage	t	\N	\N
66	Name of all authors (First name followed by last name)	\N	string	{}	65	\N	f	nameOfAllAuthors	t	\N	\N
67	Title of the research paper	\N	string	{}	65	\N	f	researchPaperTitle	t	\N	\N
68	Name of the journal/conference	\N	string	{}	65	\N	f	nameOfJourConf	t	\N	\N
71	Latest H- index**/H-5 index*** and/or core rank of the journal/conference****	\N	string	{}	65	\N	f	otherIndex	t	\N	\N
110	Passport Photo	\N	none	{}	\N	1	t	photo	t	\N	\N
75	Complete list of Journal Publications using the above table's format	\N	none	{}	\N	3	t	completeListJournalPubsSheetAttached	t	\N	\N
76	 Complete list of Conference Publications/Presentations using the format provided in ANNEXURE B	\N	none	{}	\N	3	t	completeListConferencePubsSheetAttached	t	\N	\N
77	Books published	\N	number	{}	\N	3	f	booksPublished	t	\N	\N
82	Areas of specialization	\N	string	{}	\N	4	f	areasOfSpecialization	t	\N	\N
83	Title of your Ph. D. Thesis	\N	string	{}	\N	4	f	phdThesisTitle	t	\N	\N
84	Name of your Ph.D. Supervisor	\N	string	{}	\N	4	f	phdSupervisorName	t	\N	\N
85	Please describe briefly on a separate sheet your Ph.D. work [1 page – font size 10 (Font: Times New Roman)]. Also detail the areas of interest with work done in each case (if any)	\N	none	{}	\N	4	t	phdWorkDescSheetAttached	t	\N	\N
86	 Laboratory Experience : Please describe, in brief on a separate sheet, your experience in (i) Setting up teaching and research laboratories (ii) Conducting laboratory courses & (iii) Using different types of instruments, systems, computers etc.	\N	none	{}	\N	4	t	labExpSheetAttached	t	\N	\N
88	Fellow of professional body	\N	string	{}	\N	5	f	fellowOfProfBody	t	\N	\N
89	Member of professional body	\N	string	{}	\N	5	f	memOfProfBody	t	\N	\N
93	Additional Remarks:  (Applicants may mention here any special qualifications or experience, e.g. in organisations which have not been included under the heads given above)	\N	string	{}	\N	6	f	additionalRemarks	t	\N	\N
95	Details of enclosures sent with the application	\N	none	{}	\N	6	t	listAllSheetsAttached	t	\N	\N
90	Editorial board memberships	\N	string	{}	\N	5	f	editorialBodyMemberships	t	\N	\N
81	Please give a list of courses taught on a separate sheet with course titles, level (UG/PG) and number of times taught 	\N	none	{}	\N	\N	f	coursesSheetAttached	t	\N	\N
72	Upload Files	\N	table	{}	\N	6	f	uploadedFilesList	t	\N	\N
73	Title	\N	string	{}	72	\N	f	titleOfFile	t	\N	\N
74	Document	\N	none	{}	72	\N	t	uploadedFile	t	\N	\N
96	12TH Certificate	\N	checklist	{}	\N	\N	f	\N	t	\N	\N
97	Bachelor's Degree Certificate	\N	checklist	{}	\N	\N	f	\N	t	\N	\N
98	Master's Degree Certificate	\N	checklist	{}	\N	\N	f	\N	t	\N	\N
99	Research Plan	\N	checklist	{}	\N	\N	f	\N	t	\N	\N
100	PHD Certificate	\N	checklist	{}	\N	\N	f	\N	t	\N	\N
101	Research/training experience	\N	checklist	{}	\N	\N	f	\N	t	\N	\N
105	PhD Work	\N	checklist	{}	\N	\N	f	\N	t	\N	\N
106	Laboratory experience	\N	checklist	{}	\N	\N	f	\N	t	\N	\N
102	Patents list	\N	checklist	{}	\N	\N	f	\N	t	\N	\N
103	Journal publications list	\N	checklist	{}	\N	\N	f	\N	t	\N	\N
104	Conference publications list	\N	checklist	{}	\N	\N	f	\N	t	\N	\N
70	Latest impact factor of journals	\N	string	{}	65	\N	f	impactFactor	t	\N	\N
60	Do you belong to the PWD category?	\N	select	{No,Yes}	\N	1	f	isPwd	t	\N	\N
112	Mother's Name	\N	string	{}	\N	1	f	\N	t	\N	\N
87	Awards and honours (enter comma-separated entries)	\N	textarea	{}	\N	5	f	awardsAndHonours	t	\N	\N
91	Seminars/conferences organized (enter comma-separated entries)	\N	textarea	{}	\N	5	f	semConfs	t	\N	\N
109	Aadhar ID	\N	number	{}	\N	1	f	\N	f	\N	\N
92	Did you previously apply for any post in this Institute? If so, enter advertisement number	\N	string	{}	\N	6	f	previousPostInInstitute	f	\N	\N
78	 Book chapters	\N	number	{}	\N	3	f	bookChaptersWritten	t	\N	\N
\.


--
-- Data for Name: Position; Type: TABLE DATA; Schema: public; Owner: dhushyanth
--

COPY public."Position" (id, name) FROM stdin;
ckzmnvdof0281tj7ou58vajm5	Assistant Professor
ckzmnvmdf0304tj7otm9gm143	Associate Professor
ckzmnvmdf0306tj7okaerijmg	Professor
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: dhushyanth
--

COPY public."User" (id, name, email, password, salt, verified) FROM stdin;
ckzs21i1s0187iv7olqfodnk0	Dhushyanth Sundararajan	dhushyanth5602@gmail.com	$argon2i$v=19$m=4096,t=3,p=1$pUaZPBQo5RpOZpxw96kzuw$/IS/E5dLQNtqAgmpBBG//HN4hWaFVZL+um4ICQw48Ek	d696d370859cc8afd502efc6122c60f3	f
ckzsdgr6004436s7ovv70beei	Aravind	aravindajay11@gmail.com	$argon2i$v=19$m=4096,t=3,p=1$RdRsHkg3LWIvccgYDsWBbw$qayHZUHtMa5Mb3emF/QSR9LDKHpF2vTaXgVoHwYITvE	584e484a387e5fddc695b56c6bf9b19f	f
cl0jq4ktq0132od7ooihyut6g	123	123@gmail.com	$argon2i$v=19$m=4096,t=3,p=1$8t4y5PrJH+xDdPDVaxMCiQ$USE9c05Ed96ON1kOdUHB7uIHltbKOTc7LyM6eh0/1/Y	531f98c5be2bd2cf2e1ee617751458fe	t
ckzmnbcqq0010r77o42crydz7	Test User	test@gmail.com	$argon2i$v=19$m=4096,t=3,p=1$+6fvHFka14EsNRT6qZKNsQ$L1MIv/QZBIUuuTzVcAf04IUHZvFXzrLD9Wdakc8ezNM	03fcc43041c3bf26565d6a87507d249a	t
cl9fiev5b000241c9pw75glgv	Dhushyanth S	dhushyanth@gmail.com	$argon2i$v=19$m=4096,t=3,p=1$IHiDEHcDw8bIPVLjPmL0lQ$bE5+K1Wo53jdNgIs1j1rr7KOWMazBzEo1YY97wivkaI	3ccde62058247232c4950103488557dd	f
clniqibr00022wfc9dxca7fqb	Test	testuser@gmail.com	$argon2id$v=19$m=4096,t=3,p=1$1FM3zTxWtsDKEIPL5nPMvg$Fx4XvhfVU1gNAIjUlzI5QQexSiE4cnv/kNP/OQ7QOyA	c9c17444ecf6393badae406a271bc93c	t
\.


--
-- Data for Name: Snapshot; Type: TABLE DATA; Schema: public; Owner: dhushyanth
--

COPY public."Snapshot" (id, "userId", "isComplete", "departmentId", "positionId") FROM stdin;
cl0jr3xak0965od7ouxce6vi8	cl0jq4ktq0132od7ooihyut6g	f	ckzmnssxs0089tj7oz7gvoecf	ckzmnvdof0281tj7ou58vajm5
cl0znk7e81806637okfd0ywta	ckzmnbcqq0010r77o42crydz7	f	ckzmnukd10221tj7otvksunfi	ckzmnvmdf0306tj7okaerijmg
clniqumf70024jkc9cwq600zw	clniqibr00022wfc9dxca7fqb	f	ckzmnssxs0089tj7oz7gvoecf	ckzmnvdof0281tj7ou58vajm5
\.


--
-- Data for Name: Entry; Type: TABLE DATA; Schema: public; Owner: dhushyanth
--

COPY public."Entry" (id, content, "updatedAt", "snapshotId", "fieldId", "entryId", "isFile", required) FROM stdin;
2097	3	2022-03-20 19:19:02.619	cl0jr3xak0965od7ouxce6vi8	38	\N	f	f
2075		2022-03-20 18:42:33.314	cl0jr3xak0965od7ouxce6vi8	3	\N	f	t
2076	Bachelors	2022-03-20 18:42:33.315	cl0jr3xak0965od7ouxce6vi8	19	2075	f	t
2077	78	2022-03-20 18:42:33.315	cl0jr3xak0965od7ouxce6vi8	22	2075	f	f
2078	2009	2022-03-20 18:42:33.315	cl0jr3xak0965od7ouxce6vi8	23	2075	f	f
2079		2022-03-20 18:42:33.345	cl0jr3xak0965od7ouxce6vi8	3	\N	f	t
2080	10th	2022-03-20 18:42:33.345	cl0jr3xak0965od7ouxce6vi8	19	2079	f	t
2081	98	2022-03-20 18:42:33.345	cl0jr3xak0965od7ouxce6vi8	22	2079	f	f
2249	121221234	2023-10-10 07:05:48.655	clniqumf70024jkc9cwq600zw	109	\N	f	f
2197	1	2023-10-10 07:05:48.606	clniqumf70024jkc9cwq600zw	32	\N	f	f
2082	2005	2022-03-20 18:42:33.345	cl0jr3xak0965od7ouxce6vi8	23	2079	f	f
2083		2022-03-20 18:42:33.349	cl0jr3xak0965od7ouxce6vi8	3	\N	f	t
2084	12th	2022-03-20 18:42:33.349	cl0jr3xak0965od7ouxce6vi8	19	2083	f	t
2085	90	2022-03-20 18:42:33.349	cl0jr3xak0965od7ouxce6vi8	22	2083	f	f
2086		2022-03-20 18:42:33.351	cl0jr3xak0965od7ouxce6vi8	3	\N	f	t
2087	Masters	2022-03-20 18:42:33.351	cl0jr3xak0965od7ouxce6vi8	19	2086	f	t
2088		2022-03-20 18:42:33.353	cl0jr3xak0965od7ouxce6vi8	7	\N	f	f
2089	a	2022-03-20 18:42:33.353	cl0jr3xak0965od7ouxce6vi8	8	2088	f	f
2198	1	2023-10-10 07:05:48.607	clniqumf70024jkc9cwq600zw	33	\N	f	f
2248	egrgegr	2023-10-10 07:05:48.649	clniqumf70024jkc9cwq600zw	61	\N	f	f
2090	a	2022-03-20 18:42:33.353	cl0jr3xak0965od7ouxce6vi8	24	2088	f	f
2236	2023-10-19T06:54:42.614Z	2023-10-10 07:05:48.595	clniqumf70024jkc9cwq600zw	2	\N	f	f
2091	a	2022-03-20 18:42:33.353	cl0jr3xak0965od7ouxce6vi8	25	2088	f	f
2092	2022-03-03T14:06:48.140Z	2022-03-20 18:42:33.353	cl0jr3xak0965od7ouxce6vi8	26	2088	f	f
2093	2022-03-01T14:06:46.404Z	2022-03-20 18:42:33.353	cl0jr3xak0965od7ouxce6vi8	27	2088	f	f
2094	a	2022-03-20 18:42:33.353	cl0jr3xak0965od7ouxce6vi8	28	2088	f	f
2095	a	2022-03-20 18:42:33.353	cl0jr3xak0965od7ouxce6vi8	29	2088	f	f
2124	Hey man	2022-03-23 13:01:43.58	cl0znk7e81806637okfd0ywta	1	\N	f	f
2106		2022-03-20 19:07:35.149	cl0jr3xak0965od7ouxce6vi8	65	\N	f	f
1984	123	2022-03-20 19:19:02.636	cl0jr3xak0965od7ouxce6vi8	109	\N	f	f
2029	db06202da342eaadebff49b03.png	2022-03-20 19:19:02.636	cl0jr3xak0965od7ouxce6vi8	110	\N	t	f
2107	1	2022-03-20 19:07:35.149	cl0jr3xak0965od7ouxce6vi8	66	2106	f	f
2177	c9f4c1878890adc7cf4d47700.png	2022-03-23 13:01:43.659	cl0znk7e81806637okfd0ywta	110	\N	t	f
2163		2022-03-20 19:16:48.01	cl0znk7e81806637okfd0ywta	3	\N	f	t
2108	1	2022-03-20 19:07:35.149	cl0jr3xak0965od7ouxce6vi8	67	2106	f	f
2125	2022-03-10T19:13:41.273Z	2022-03-23 13:01:43.626	cl0znk7e81806637okfd0ywta	2	\N	f	f
2126	Male	2022-03-23 13:01:43.63	cl0znk7e81806637okfd0ywta	10	\N	f	f
2109	1	2022-03-20 19:07:35.149	cl0jr3xak0965od7ouxce6vi8	68	2106	f	f
2127	Married	2022-03-23 13:01:43.633	cl0znk7e81806637okfd0ywta	11	\N	f	f
2128	xyz apartments, bihar	2022-03-23 13:01:43.642	cl0znk7e81806637okfd0ywta	14	\N	f	f
2129	688688	2022-03-23 13:01:43.644	cl0znk7e81806637okfd0ywta	15	\N	f	f
2155	3	2022-03-23 13:01:43.645	cl0znk7e81806637okfd0ywta	38	\N	f	f
2110	f	2022-03-20 19:07:35.149	cl0jr3xak0965od7ouxce6vi8	69	2106	f	f
2111	1	2022-03-20 19:07:35.149	cl0jr3xak0965od7ouxce6vi8	70	2106	f	f
2112	1	2022-03-20 19:07:35.149	cl0jr3xak0965od7ouxce6vi8	71	2106	f	f
2113		2022-03-20 19:07:35.158	cl0jr3xak0965od7ouxce6vi8	72	\N	f	f
2164	10th	2022-03-20 19:16:48.01	cl0znk7e81806637okfd0ywta	19	2163	f	t
2165	66	2022-03-20 19:16:48.01	cl0znk7e81806637okfd0ywta	22	2163	f	f
2166	2001	2022-03-20 19:16:48.01	cl0znk7e81806637okfd0ywta	23	2163	f	f
2167		2022-03-20 19:16:48.016	cl0znk7e81806637okfd0ywta	3	\N	f	t
2114	Imp doc	2022-03-20 19:07:35.158	cl0jr3xak0965od7ouxce6vi8	73	2113	f	f
2115	db06202da342eaadebff49b02.pdf	2022-03-20 19:07:35.158	cl0jr3xak0965od7ouxce6vi8	74	2113	f	f
2168	12th	2022-03-20 19:16:48.016	cl0znk7e81806637okfd0ywta	19	2167	f	t
2169	65	2022-03-20 19:16:48.016	cl0znk7e81806637okfd0ywta	22	2167	f	f
2170	2003	2022-03-20 19:16:48.016	cl0znk7e81806637okfd0ywta	23	2167	f	f
2171		2022-03-20 19:16:48.018	cl0znk7e81806637okfd0ywta	3	\N	f	t
2172	Bachelors	2022-03-20 19:16:48.018	cl0znk7e81806637okfd0ywta	19	2171	f	t
2173		2022-03-20 19:16:48.021	cl0znk7e81806637okfd0ywta	3	\N	f	t
2174	Masters	2022-03-20 19:16:48.021	cl0znk7e81806637okfd0ywta	19	2173	f	t
2175	dhushytushy	2022-03-20 19:19:02.492	cl0jr3xak0965od7ouxce6vi8	1	\N	f	f
2176	2022-03-16T19:18:55.261Z	2022-03-20 19:19:02.607	cl0jr3xak0965od7ouxce6vi8	2	\N	f	f
1985	Male	2022-03-20 19:19:02.613	cl0jr3xak0965od7ouxce6vi8	10	\N	f	f
2098	4	2022-03-20 19:19:02.625	cl0jr3xak0965od7ouxce6vi8	39	\N	f	f
2099	5	2022-03-20 19:19:02.626	cl0jr3xak0965od7ouxce6vi8	40	\N	f	f
2100	6	2022-03-20 19:19:02.628	cl0jr3xak0965od7ouxce6vi8	41	\N	f	f
2101	7	2022-03-20 19:19:02.629	cl0jr3xak0965od7ouxce6vi8	43	\N	f	f
2102	8	2022-03-20 19:19:02.631	cl0jr3xak0965od7ouxce6vi8	50	\N	f	f
2103	5	2022-03-20 19:19:02.632	cl0jr3xak0965od7ouxce6vi8	51	\N	f	f
2104	1	2022-03-20 19:19:02.634	cl0jr3xak0965od7ouxce6vi8	77	\N	f	f
2105	4	2022-03-20 19:19:02.634	cl0jr3xak0965od7ouxce6vi8	78	\N	f	f
2096	Nobel prize, President's Award, Saturn Award	2022-03-20 19:19:02.635	cl0jr3xak0965od7ouxce6vi8	87	\N	f	f
2156	4	2022-03-23 13:01:43.646	cl0znk7e81806637okfd0ywta	39	\N	f	f
2157	1	2022-03-23 13:01:43.648	cl0znk7e81806637okfd0ywta	40	\N	f	f
2158	2	2022-03-23 13:01:43.649	cl0znk7e81806637okfd0ywta	41	\N	f	f
2159	3	2022-03-23 13:01:43.65	cl0znk7e81806637okfd0ywta	42	\N	f	f
2160	4	2022-03-23 13:01:43.652	cl0znk7e81806637okfd0ywta	43	\N	f	f
2161	5	2022-03-23 13:01:43.654	cl0znk7e81806637okfd0ywta	77	\N	f	f
2162	2	2022-03-23 13:01:43.655	cl0znk7e81806637okfd0ywta	78	\N	f	f
2142	Hi, nice one, bye, thanks	2022-03-23 13:01:43.656	cl0znk7e81806637okfd0ywta	87	\N	f	f
2268		2023-10-10 07:00:48.079	clniqumf70024jkc9cwq600zw	3	\N	f	t
2269	12th	2023-10-10 07:00:48.079	clniqumf70024jkc9cwq600zw	19	2268	f	t
2272		2023-10-10 07:00:48.08	clniqumf70024jkc9cwq600zw	3	\N	f	t
2273	Masters	2023-10-10 07:00:48.08	clniqumf70024jkc9cwq600zw	19	2272	f	t
2237	500f82db3d34ba64bc43e3107.pdf	2023-10-10 07:05:48.596	clniqumf70024jkc9cwq600zw	9	\N	t	f
2238	Male	2023-10-10 07:05:48.597	clniqumf70024jkc9cwq600zw	10	\N	f	f
2239	Single	2023-10-10 07:05:48.598	clniqumf70024jkc9cwq600zw	11	\N	f	f
2240	ergertgreg	2023-10-10 07:05:48.599	clniqumf70024jkc9cwq600zw	13	\N	f	f
2241	ergergerg	2023-10-10 07:05:48.6	clniqumf70024jkc9cwq600zw	14	\N	f	f
2242	234234	2023-10-10 07:05:48.601	clniqumf70024jkc9cwq600zw	15	\N	f	f
2243	dhushyan@gmail.com	2023-10-10 07:05:48.603	clniqumf70024jkc9cwq600zw	16	\N	f	f
2244	wefwef	2023-10-10 07:05:48.604	clniqumf70024jkc9cwq600zw	30	\N	f	f
2245	1231231231	2023-10-10 07:05:48.627	clniqumf70024jkc9cwq600zw	45	\N	f	f
2246	fverer	2023-10-10 07:05:48.634	clniqumf70024jkc9cwq600zw	55	\N	f	f
2247	egrergerg	2023-10-10 07:05:48.637	clniqumf70024jkc9cwq600zw	57	\N	f	f
2186	By domicile	2023-10-10 07:05:48.643	clniqumf70024jkc9cwq600zw	58	\N	f	f
2187	SC	2023-10-10 07:05:48.645	clniqumf70024jkc9cwq600zw	59	\N	f	f
2188	Yes	2023-10-10 07:05:48.647	clniqumf70024jkc9cwq600zw	60	\N	f	f
2282	wkrfnberferj	2023-10-10 07:05:48.658	clniqumf70024jkc9cwq600zw	112	\N	f	f
2235	gyguy	2023-10-10 07:05:48.593	clniqumf70024jkc9cwq600zw	1	\N	f	f
2199	1	2023-10-10 07:05:48.609	clniqumf70024jkc9cwq600zw	34	\N	f	f
2200	1	2023-10-10 07:05:48.61	clniqumf70024jkc9cwq600zw	35	\N	f	f
2201	1	2023-10-10 07:05:48.611	clniqumf70024jkc9cwq600zw	36	\N	f	f
2202	1	2023-10-10 07:05:48.612	clniqumf70024jkc9cwq600zw	37	\N	f	f
2203	1	2023-10-10 07:05:48.614	clniqumf70024jkc9cwq600zw	38	\N	f	f
2204	1	2023-10-10 07:05:48.617	clniqumf70024jkc9cwq600zw	39	\N	f	f
2205	1	2023-10-10 07:05:48.619	clniqumf70024jkc9cwq600zw	40	\N	f	f
2206	1	2023-10-10 07:05:48.621	clniqumf70024jkc9cwq600zw	41	\N	f	f
2207	1	2023-10-10 07:05:48.623	clniqumf70024jkc9cwq600zw	42	\N	f	f
2208	1	2023-10-10 07:05:48.625	clniqumf70024jkc9cwq600zw	43	\N	f	f
2209	1	2023-10-10 07:05:48.63	clniqumf70024jkc9cwq600zw	50	\N	f	f
2210	1	2023-10-10 07:05:48.631	clniqumf70024jkc9cwq600zw	51	\N	f	f
2252	500f82db3d34ba64bc43e3108.pdf	2023-10-10 07:05:48.651	clniqumf70024jkc9cwq600zw	63	\N	t	f
2253	500f82db3d34ba64bc43e3109.pdf	2023-10-10 07:05:48.652	clniqumf70024jkc9cwq600zw	64	\N	t	f
2254	500f82db3d34ba64bc43e310a.pdf	2023-10-10 07:05:48.653	clniqumf70024jkc9cwq600zw	75	\N	t	f
2255	500f82db3d34ba64bc43e310b.pdf	2023-10-10 07:05:48.654	clniqumf70024jkc9cwq600zw	76	\N	t	f
2256	1	2023-10-10 07:05:48.654	clniqumf70024jkc9cwq600zw	77	\N	f	f
2257	2	2023-10-10 07:05:48.655	clniqumf70024jkc9cwq600zw	78	\N	f	f
2250	500f82db3d34ba64bc43e3106.pdf	2023-10-10 07:05:48.656	clniqumf70024jkc9cwq600zw	110	\N	t	f
2251	vfdvgergre	2023-10-10 07:05:48.656	clniqumf70024jkc9cwq600zw	111	\N	f	f
2258		2023-10-10 07:00:48.076	clniqumf70024jkc9cwq600zw	3	\N	f	t
2259	ekjfnerf	2023-10-10 07:00:48.076	clniqumf70024jkc9cwq600zw	4	2258	f	f
2260	2023-10-03T06:59:45.700Z	2023-10-10 07:00:48.076	clniqumf70024jkc9cwq600zw	5	2258	f	f
2261	2023-10-05T06:59:47.311Z	2023-10-10 07:00:48.076	clniqumf70024jkc9cwq600zw	17	2258	f	f
2262	wrferfger	2023-10-10 07:00:48.076	clniqumf70024jkc9cwq600zw	18	2258	f	f
2263	10th	2023-10-10 07:00:48.076	clniqumf70024jkc9cwq600zw	19	2258	f	t
2264	efwefef	2023-10-10 07:00:48.076	clniqumf70024jkc9cwq600zw	20	2258	f	f
2265	fwefwef	2023-10-10 07:00:48.076	clniqumf70024jkc9cwq600zw	21	2258	f	f
2266	wefwef	2023-10-10 07:00:48.076	clniqumf70024jkc9cwq600zw	22	2258	f	f
2267	2013	2023-10-10 07:00:48.076	clniqumf70024jkc9cwq600zw	23	2258	f	f
2270		2023-10-10 07:00:48.08	clniqumf70024jkc9cwq600zw	3	\N	f	t
2271	Bachelors	2023-10-10 07:00:48.08	clniqumf70024jkc9cwq600zw	19	2270	f	t
2274		2023-10-10 07:00:48.081	clniqumf70024jkc9cwq600zw	7	\N	f	f
2275	hb	2023-10-10 07:00:48.081	clniqumf70024jkc9cwq600zw	8	2274	f	f
2276	ybi	2023-10-10 07:00:48.081	clniqumf70024jkc9cwq600zw	24	2274	f	f
2277	bj	2023-10-10 07:00:48.081	clniqumf70024jkc9cwq600zw	25	2274	f	f
2278	2023-10-05T10:23:38.345Z	2023-10-10 07:00:48.081	clniqumf70024jkc9cwq600zw	26	2274	f	f
2279	2023-10-04T10:23:36.033Z	2023-10-10 07:00:48.081	clniqumf70024jkc9cwq600zw	27	2274	f	f
2280	biu	2023-10-10 07:00:48.081	clniqumf70024jkc9cwq600zw	28	2274	f	f
2281	bj	2023-10-10 07:00:48.081	clniqumf70024jkc9cwq600zw	29	2274	f	f
\.


--
-- Data for Name: PasswordResetRequest; Type: TABLE DATA; Schema: public; Owner: dhushyanth
--

COPY public."PasswordResetRequest" (id, "userId", password, salt, "createdAt", "isReset") FROM stdin;
ckzs25qwi0241iv7o58zmtixw	ckzs21i1s0187iv7olqfodnk0	$argon2i$v=19$m=4096,t=3,p=1$uD0cQxOvzO1j4pN9nxkfAg$q4kciLMHn+TabKWUugr6Y2Mw/+cq14cd9FKFCNwGqwI	2f51b2c614a06d1572105c76d73ca5b1	2022-02-18 06:55:43.986	f
ckzsdqp0z07336s7o2ru4znzl	ckzsdgr6004436s7ovv70beei	$argon2i$v=19$m=4096,t=3,p=1$4GOWdGo+KCDgBe7LcK1h1Q$C//sZXmKDuxriYV3cNb4ODauYXMleUkqY8DsfbHfvGQ	3ecc9dcd311c75f9f046dc7fa628f9f4	2022-02-18 12:19:57.107	t
ckzsdt6w307826s7os99dwazn	ckzsdgr6004436s7ovv70beei	$argon2i$v=19$m=4096,t=3,p=1$RdRsHkg3LWIvccgYDsWBbw$qayHZUHtMa5Mb3emF/QSR9LDKHpF2vTaXgVoHwYITvE	584e484a387e5fddc695b56c6bf9b19f	2022-02-18 12:21:53.571	f
\.


--
-- Data for Name: Referral; Type: TABLE DATA; Schema: public; Owner: dhushyanth
--

COPY public."Referral" (id, "userId", submitted, email, address) FROM stdin;
clnjz449y01653wc9y6j45vop	clniqibr00022wfc9dxca7fqb	f	dhushyanth@gmail.com	Hello
\.


--
-- Data for Name: ReferralField; Type: TABLE DATA; Schema: public; Owner: dhushyanth
--

COPY public."ReferralField" (id, title, description, type, "allowFile") FROM stdin;
1	Name	\N	string	f
2	Referral	\N	rich	t
3	Phone Number	\N	string	f
\.


--
-- Data for Name: ReferralEntry; Type: TABLE DATA; Schema: public; Owner: dhushyanth
--

COPY public."ReferralEntry" (id, content, "updatedAt", "fieldId", "referralId", "isFile") FROM stdin;
\.


--
-- Data for Name: TemplateEntries; Type: TABLE DATA; Schema: public; Owner: dhushyanth
--

COPY public."TemplateEntries" (id, content, "updatedAt", "fieldId", "isFile") FROM stdin;
1	10th	2021-12-31 11:35:45.082	19	f
2	12th	2021-12-31 11:36:09.107	19	f
3	Bachelors	2021-12-31 11:36:17.851	19	f
4	Masters	2021-12-31 11:36:58.904	19	f
\.


--
-- Data for Name: UploadHistory; Type: TABLE DATA; Schema: public; Owner: dhushyanth
--

COPY public."UploadHistory" (id, "userId", "fieldId", "uploadAt") FROM stdin;
\.


--
-- Data for Name: VerificationRequest; Type: TABLE DATA; Schema: public; Owner: dhushyanth
--

COPY public."VerificationRequest" (id, "createdAt", "userId", "isVerified") FROM stdin;
cl0zjqydv01494e7odhyv3b64	2022-03-20 17:22:12.499	ckzmnbcqq0010r77o42crydz7	t
cl9fiev5u000941c90ooii3id	2022-10-19 10:46:46.338	cl9fiev5b000241c9pw75glgv	f
clniqibr60030wfc90bvg50co	2023-10-09 10:12:35.97	clniqibr00022wfc9dxca7fqb	f
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: dhushyanth
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
9a4e1159-67b6-43c7-acc0-f5f9dadaaf5a	09f16442e6c87d58f0973fd64c5b311fbc5a645f8287ad31930950a721df362e	2021-12-20 19:01:53.846355+05:30	20211205124652_init	\N	\N	2021-12-20 19:01:53.836022+05:30	1
ea8bcbaf-40fa-4b6e-8ed1-592b5c0a02fb	a23b2d0fcb486088356f5319d7c198af831bd12480ded00a8555476a328e3fa3	2022-02-18 12:31:42.084317+05:30	20220218070142_remove_unique_constraint	\N	\N	2022-02-18 12:31:42.079809+05:30	1
57820f5b-3cc9-49d6-88aa-eae9b04cd556	210de3442d64b869a06ba705fc6a7fca82103ac1eb9d39940ee59accda4e5dd5	2021-12-20 19:01:53.853087+05:30	20211207090433_added_fields	\N	\N	2021-12-20 19:01:53.846941+05:30	1
17a91e8b-ee2e-4a02-902b-a9cab056613f	ee5b23af5a70d1398958727d703303c43c029b3034ca60f815f4ec82b1317d8e	2021-12-23 11:32:22.0085+05:30	20211223060221_1_0_12	\N	\N	2021-12-23 11:32:22.003008+05:30	1
430649bd-3621-4a63-99b1-a856cab3e6f1	02e29e4039d1891dc6e2b6f1396bb5aae4c080985badb06c5be64c4768f70904	2021-12-20 19:01:53.854705+05:30	20211207094653_removed_unique	\N	\N	2021-12-20 19:01:53.853467+05:30	1
48f493f6-9c95-4e82-95c6-026f9a2527ee	ababfdeabc880d0bc772b13c25db9f66a4c5bb30c6ee3c69b9d5c624e4b774f5	2021-12-20 19:01:53.866591+05:30	20211210092034_1_0_1	\N	\N	2021-12-20 19:01:53.855139+05:30	1
5f95cc4b-4e7b-41be-9dc7-bc9e276d180c	faab444786f1fea719ff278ed33663c596c30b9200bcc953ffde286c51d8adcd	2022-02-10 20:31:54.705609+05:30	20220210150154_	\N	\N	2022-02-10 20:31:54.70192+05:30	1
7daca2f6-b071-4da9-81df-5eccb0a39bb9	dfc296d3afd120545d7663b1bff0964bc411686f559f819db79071c715d6a6a4	2021-12-20 19:01:53.869276+05:30	20211210093241_1_0_2	\N	\N	2021-12-20 19:01:53.866901+05:30	1
a756c358-7ad7-47d3-852e-fd67a5c73fbd	1be12b23d42ebc718dc10d9411549dd6c41b7060d65845c588a993337881dffe	2021-12-25 18:54:34.195042+05:30	20211225132434_1_0_13	\N	\N	2021-12-25 18:54:34.191017+05:30	1
5d4eca02-8fc8-425e-876f-33445eb27e57	0aa60b9956012165c3e8c9d655bcf580ec66e2ee39bf9a2960d3d0b98d193797	2021-12-20 19:01:53.874327+05:30	20211210105952_1_0_3	\N	\N	2021-12-20 19:01:53.86959+05:30	1
45786e0c-33a2-4a30-85ce-43be160d82da	e70485b3b5a44d9be9b53322574b696f07c55aa31c09b649797a3a862e49706c	2021-12-20 19:01:53.883187+05:30	20211214135814_1_0_4	\N	\N	2021-12-20 19:01:53.87483+05:30	1
a719c70b-7b7d-427c-bb5e-7645f575b82c	c102ea707d568cc3baa349ecbbf9e8ebdb598e8b24e07a109db3095a0f3627e0	2021-12-20 19:01:53.884866+05:30	20211216170126_1_0_5	\N	\N	2021-12-20 19:01:53.88352+05:30	1
77e9f163-5d52-40a1-9b86-a51ece00a2c4	42d5b653ab93f4cf16ee3fa4615f279a67bd764c03c20854c9c3f4858c8286ed	2021-12-31 15:40:43.058525+05:30	20211231101042_1_0_14	\N	\N	2021-12-31 15:40:43.015181+05:30	1
6d79d3bc-8e0f-49e9-9911-3028e9eda31c	900397a12f32c66725b9f90d379ce3dbeb0bc54b48b1e658ddd74809f822b122	2021-12-20 19:01:53.886499+05:30	20211218143907_1_0_6	\N	\N	2021-12-20 19:01:53.885145+05:30	1
6e5caa72-2fd1-4a1c-9618-f312359d911c	f89450a66e2edd7614d291d11eb56b0a450f09153d3732792f272cee69343d2f	2021-12-20 19:01:53.890343+05:30	20211218161210_1_0_7	\N	\N	2021-12-20 19:01:53.886766+05:30	1
60c2152e-ddb9-4fc0-81d6-ccaa114cf1a0	bb3efcea1fb16cec9d37479fe787f746007e8a526e1e421b0bf254a7a14f55b8	2021-12-20 19:01:53.891967+05:30	20211219140418_1_0_8	\N	\N	2021-12-20 19:01:53.890799+05:30	1
bfb3abf9-1433-4ce1-bef6-0d632c486a6d	ad2f26fe88ab950455d471ec5b4ef3c2057be6008fc6ea564e34645197e74b0c	2021-12-31 15:49:29.056209+05:30	20211231101929_1_0_15	\N	\N	2021-12-31 15:49:29.042287+05:30	1
8dfc08cb-01c1-4338-9386-58a9a10adbae	53ef02217f94dbbc622ef2e9ee1cea0b2d66157cfbf2bdfa1f7db5ab385fc103	2021-12-20 19:01:53.896172+05:30	20211219171624_1_0_9	\N	\N	2021-12-20 19:01:53.892268+05:30	1
3a5b8f46-a080-4779-8c54-51b5df11d5da	fa717127d26e0debd807354c6b0f74482f8be041abafeee2a2b4ba9fa4ca3faf	2021-12-20 19:02:10.253347+05:30	20211220133210_1_0_10	\N	\N	2021-12-20 19:02:10.250358+05:30	1
eb505ae5-f421-454b-8d98-0c0210d070b2	183091f258bb93c6a56921f4f4499ce20fbe680f4e73e7ca9a78c8ade0ece601	2022-02-13 19:14:39.927783+05:30	20220213134439_snapshot_unique_id	\N	\N	2022-02-13 19:14:39.89565+05:30	1
fea0efbd-e095-4437-ac72-db117b4de361	a47a3241b575454c4b4d0430bbedf58a780004914eab9a8690629c76e307ba21	2021-12-23 11:23:41.543062+05:30	20211223055341_1_0_11	\N	\N	2021-12-23 11:23:41.537279+05:30	1
462acf14-ea98-4698-a804-ef884119e236	33b8e4d6c01dcfdbcee8082179b07f245a3f9ebd61a067e0fe8a0620ea677754	2021-12-31 16:02:49.647896+05:30	20211231103249_1_0_16	\N	\N	2021-12-31 16:02:49.634486+05:30	1
cf1f7fe8-3288-4d5f-a2f9-553ac3b05634	370bd266ab09c3fc432be90d5c8a05bd055b35218a42519f7b9854dff1d5fc46	2021-12-31 17:02:32.777529+05:30	20211231113232_1_0_17	\N	\N	2021-12-31 17:02:32.494806+05:30	1
f2948c34-b4e7-43b5-8e4c-e236d15f63c3	5306de5071ac3bc1caf5893f111208e7cf2d78c93d189e274e6c576b26cbc5e5	2022-01-26 19:31:44.820563+05:30	20220126140144_1_0_18	\N	\N	2022-01-26 19:31:44.80037+05:30	1
ae847552-5068-4c24-95c7-36b765d7b197	5a1291186e34961a500dc3717f081c5c5dd08ef6ef2ccfbfb084962e1ef32889	2022-02-14 17:29:39.142108+05:30	20220214115927_department_and_position	\N	\N	2022-02-14 17:29:39.128815+05:30	1
842c4d72-fc27-43ca-8cb0-a4275e06fcbb	2884f5d8e9142de8f1dc2dd29c75fa8be890980809b261a77e85395bf4a4b89e	2022-01-26 22:44:46.299954+05:30	20220126171446_1_0_19	\N	\N	2022-01-26 22:44:46.293619+05:30	1
ff6630ff-3bad-41eb-95cd-62cbc646b881	aead53253b5ccfd5b3f0ad9b8ca399cc84f2eb689397530ea60650b132fb43cd	2022-02-10 20:18:08.574432+05:30	20220210144808_	\N	\N	2022-02-10 20:18:08.564129+05:30	1
2cc0d19f-4724-47d4-9cd3-f34703d6761d	ff6f29e09c754afc7ae3bb723a14b9e08b0cbd7a35a640c1e50a518a964d9267	2022-03-15 16:24:38.977732+05:30	20220315105438_field_length_and_required	\N	\N	2022-03-15 16:24:38.974178+05:30	1
1a7d978f-820d-45ea-adb0-1a000a569900	e1b6e13cae3beceffb7955b53b14e4cd4519bc897f6bdb817af8fb444bfdf4ab	2022-02-18 11:11:55.256522+05:30	20220218054155_password_reset	\N	\N	2022-02-18 11:11:55.246823+05:30	1
7e5c99ac-f4ad-401a-a97b-fa6086f71922	c9a4b2bde5616f035cf958e9fe85722ede77db30b9be73917a481de8e131f284	2022-02-18 11:26:28.260128+05:30	20220218055628_fix_password_request	\N	\N	2022-02-18 11:26:28.256877+05:30	1
17961d1b-bccd-4b2f-b012-1ed8bf4b8181	88d4c79e63558f029bed53f76b57f67adda6b1790b65afd0c3fb1dbdd6fa8a03	2022-03-20 22:25:26.337013+05:30	20220320165526_added_default_for_isverified	\N	\N	2022-03-20 22:25:26.33513+05:30	1
97460337-0a6a-426d-93f3-ab564117bf25	25bb5eacd0c74de56d0c7ec1198e6dcbfedb59f0f5675982f80dcb52997bd9e0	2022-03-16 19:13:19.019771+05:30	20220316134318_email_verification	\N	\N	2022-03-16 19:13:19.009093+05:30	1
2cc82985-f47a-496d-a95c-96311ef91a70	4d51b17ce4415f7af7a2f73699b85a0f055e0859060d3f3ca83ef2aedba33a6e	2022-03-20 22:24:06.357336+05:30	20220320165406_add_isverified	\N	\N	2022-03-20 22:24:06.355519+05:30	1
\.


--
-- Name: Entry_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dhushyanth
--

SELECT pg_catalog.setval('public."Entry_id_seq"', 2282, true);


--
-- Name: FieldGroup_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dhushyanth
--

SELECT pg_catalog.setval('public."FieldGroup_id_seq"', 6, true);


--
-- Name: Field_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dhushyanth
--

SELECT pg_catalog.setval('public."Field_id_seq"', 112, true);


--
-- Name: ReferralEntry_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dhushyanth
--

SELECT pg_catalog.setval('public."ReferralEntry_id_seq"', 8, true);


--
-- Name: ReferralField_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dhushyanth
--

SELECT pg_catalog.setval('public."ReferralField_id_seq"', 3, true);


--
-- Name: TemplateEntries_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dhushyanth
--

SELECT pg_catalog.setval('public."TemplateEntries_id_seq"', 4, true);


--
-- Name: UploadHistory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dhushyanth
--

SELECT pg_catalog.setval('public."UploadHistory_id_seq"', 1, false);


--
-- PostgreSQL database dump complete
--

--
-- Database "postgres" dump
--

\connect postgres

--
-- PostgreSQL database dump
--

-- Dumped from database version 14.10
-- Dumped by pg_dump version 14.10

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database cluster dump complete
--

