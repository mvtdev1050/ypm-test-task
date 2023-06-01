import StudentsPicker from '../components/StudentsPicker';
import StudentsTable from '../components/StudentsTable';
import { fetchStudentData, fetchSchoolData, fetchLegalguardianData } from '../utils';
import { useState, useEffect } from 'react';


const studentsDataComponent = () => {
  const [studentsData, setStudentsData] = useState([]);
  const [schoolsData, setSchoolsData] = useState([]);
  const [legalguardiansData, setLegalguardiansData] = useState([]);
  const [sids,setSids]= useState([1,2,3,4,5,6]);


  const onStudentsPick = async (studentIds) => {
    const StudentsData = await Promise.all(studentIds.map(fetchStudentData));
    const SchoolsData = await Promise.all(StudentsData.map(student => fetchSchoolData(student.schoolId)).reduce((acc, curr) => acc.concat(curr), []));
    const LegalguardiansData = await Promise.all(StudentsData.map(student => fetchLegalguardianData(student.legalguardianId)).reduce((acc, curr) => acc.concat(curr), []));

     //update  via hooks 
     setStudentsData(StudentsData); //or can add  it using  spread operator too
     setSchoolsData(SchoolsData);
     setLegalguardiansData(LegalguardiansData);
   

  };

  ///for the initial rendering , we can also use useEffect hook and get intial data for studentsData , schoolsData and legalguardiansData
  //but this can be done if we have 'studentIds' . Can get 'student Ids' from api or can add static at top (Here I am declaring it at top)

  useEffect(() => {
    onStudentsPick(sids)
  }, []);   //this will run only one time (render time)


  return (
    <>
      <  onPickHandler={onStudentsPick} />
      <StudentsTable
        studentsData={studentsData}
        schoolsData={schoolsData}
        LegalguardiansData={legalguardiansData}
      />
    </>
  );
};


export default studentsDataComponent;
