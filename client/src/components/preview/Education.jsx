import React from "react";

function Education({ resumeInfo }) {
    return (
        <div className="mt-2 mb-3">
            <h2 className="text-sm font-normal">EDUCATION</h2>
            <hr className="my-1 border-[0.5px] border-gray-400" />

            <div>
                {resumeInfo?.education && resumeInfo.education.length > 0 ? (
                    resumeInfo?.education.map((edu, index) => (
                        <div key={index} className="mb-2">
                            <div className="flex justify-between">
                                <h2 className="text-sm font-bold">
                                    {edu.institution}
                                </h2>
                                <h2 className="text-sm ">{edu.location}</h2>
                            </div>
                            <div className="flex justify-between">
                                <h2 className="text-xs mt-1">
                                    {edu.fieldOfStudy} {edu.degreeType}
                                </h2>
                                <h2 className="text-xs mt-1">
                                    {edu.startMonthYear} - {edu.endMonthYear}
                                </h2>
                            </div>
                            <h2 className="text-xs mt-1">CGPA: {edu.cgpa}</h2>
                        </div>
                    ))
                ) : (<p className="text-sm text-gray-500">No Education available</p>)}
            </div>
        </div>
    );
}

export default Education;
