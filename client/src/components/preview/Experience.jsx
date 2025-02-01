import React from "react";

function Experience({ resumeInfo }) {
    return (
        <div className="my-3">
            <h2 className="text-sm font-normal">EXPERIENCE</h2>
            <hr className="my-1 border-[0.5px] border-gray-400" />

            <div>
                {resumeInfo?.experience && resumeInfo.experience.length > 0 ? (
                    resumeInfo?.experience.map((exp, index) => (
                        <div
                            key={index}
                            className="mb-2"
                        >
                            <div className="flex justify-between">
                                <h2 className="text-sm font-bold">
                                    {exp.employer} {" | "} {exp.jobTitle}
                                </h2>
                                <h2 className="text-sm ">
                                    {exp.location} {" | "} {exp.startMonthYear}-{exp.endMonthYear}
                                </h2>
                            </div>
                            {/* <p className="text-xs my-1">{exp.description}</p> */}
                            <div className="text-xs my-1" dangerouslySetInnerHTML={{__html: exp?.description}}/>
                        </div>
                    ))
                ) : (<p className="text-sm text-gray-500">No Experience available</p>)}
            </div>
        </div>
    );
}

export default Experience;
