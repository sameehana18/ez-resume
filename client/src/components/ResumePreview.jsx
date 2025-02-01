import React, { useContext } from 'react';
import { ResumeInfoContext } from '../context/ResumeInfoContext.jsx';
import PersonalInfo from './preview/PersonalInfo.jsx';
import Education from './preview/Education.jsx';
import Experience from './preview/Experience.jsx';
import Projects from './preview/Projects.jsx';
import Skills from './preview/Skills.jsx';
import Certifications from './preview/Certifications.jsx';

function ResumePreview() {

    const { resumeInfo, setResumeInfo} = useContext(ResumeInfoContext);
  return (
    <div className='shadow-lg h-full p-14 bg-white'>
      {/* Personal Info */}
        <PersonalInfo resumeInfo={resumeInfo}/>
      {/* Education */}
        <Education resumeInfo={resumeInfo}/>
      {/* Experience */}
        <Experience resumeInfo={resumeInfo}/>
      {/* Projects */}
        <Projects resumeInfo={resumeInfo}/>
      {/* Skills */}
        <Skills resumeInfo={resumeInfo}/>
      {/* Certifications */}
        <Certifications resumeInfo={resumeInfo}/>
    </div>
  )
}

export default ResumePreview
