import React from "react";

function PersonalInfo({ resumeInfo }) {
    return (
        <div>
            <h2 className="font-bold text-3xl text-center">
                {resumeInfo?.personalInfo?.firstName}{" "}
                {resumeInfo?.personalInfo?.lastName}
            </h2>
            <h2 className="text-center font-normal text-sm">
                {resumeInfo?.personalInfo?.jobTitle}
            </h2>

            <div className="flex justify-center mt-1">
                {[
                    resumeInfo?.personalInfo?.email,
                    resumeInfo?.personalInfo?.phone,
                    resumeInfo?.personalInfo?.address,
                ].map((info, index) => (
                    <span key={index} className='font-normal text-sm ml-0.5'>
                        {info} {index < 2 && " | "}
                    </span>
                ))
                }
            </div>

            <div className="text-center mt-1">
                {resumeInfo?.personalInfo?.links.map((link, index) => (
                    <span key={index}>
                        <a href={link.url} target="_blank" className="text-xs text-black font-bold">{link.name}</a>
                        {index < resumeInfo.personalInfo.links.length -1 && " | "}
                    </span>
                    
                ))}
            </div>
        </div>
    );
}

export default PersonalInfo;
