import React from 'react'

function Skills({resumeInfo}) {
  return (
    <div className="my-3">
        <h2 className="text-sm font-normal">SKILLS</h2>
        <hr className="my-1 border-[0.5px] border-gray-400" />

        <div>
            <div className='flex'>
                <h2 className='text-sm font-bold mr-2'>Programming Languages : </h2>
                {resumeInfo?.skillset?.programmingLanguages && resumeInfo.skillset.programmingLanguages.length > 0 ? (
                    resumeInfo?.skillset?.programmingLanguages.map((lang, index) => (
                        <h2 key={index} className='text-sm ml-1'>{lang} {index < resumeInfo.skillset.programmingLanguages.length - 1 && ", "}</h2>
                    ))
                ) : (<p className="text-sm text-gray-500">No programming languages available</p>)}
            </div>
            <div className='flex mt-1'>
                <h2 className='text-sm font-bold mr-2'>Libraries : </h2>
                {resumeInfo?.skillset?.libraries && resumeInfo.skillset.libraries.length > 0 ? (
                    resumeInfo?.skillset?.libraries.map((lib, index) => (
                        <h2 key={index} className='text-sm ml-1'>{lib} {index < resumeInfo.skillset.libraries.length - 1 && ", "}</h2>
                    ))
                ) : (<p className="text-sm text-gray-500">No libraries available</p>)}
            </div>
            <div className='flex mt-1'>
                <h2 className='text-sm font-bold mr-2'>Tools : </h2>
                {resumeInfo?.skillset?.tools && resumeInfo.skillset.tools.length > 0 ? (
                    resumeInfo?.skillset?.tools.map((tool, index) => (
                        <h2 key={index} className='text-sm ml-1'>{tool} {index < resumeInfo.skillset.tools.length - 1 && ", "}</h2>
                    ))
                ) : (<p className="text-sm text-gray-500">No tools available</p>)}
            </div>
            <div className='flex mt-1'>
                <h2 className='text-sm font-bold mr-2'>Databases : </h2>
                {resumeInfo?.skillset?.databases && resumeInfo.skillset.databases.length > 0 ? (
                    resumeInfo?.skillset?.databases.map((db, index) => (
                        <h2 key={index} className='text-sm ml-1'>{db} {index < resumeInfo.skillset.databases.length - 1 && ", "}</h2>
                    ))
                ): (<p className="text-sm text-gray-500">No tools available</p>)}
            </div>
        </div>
    </div>
  )
}

export default Skills
