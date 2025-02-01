import React from "react";

function Projects({ resumeInfo }) {
    return (
        <div className="my-3">
            <h2 className="text-sm font-normal">PROJECTS</h2>
            <hr className="my-1 border-[0.5px] border-gray-400" />
            <div>
                {resumeInfo?.projects && resumeInfo.projects.length > 0 ? (
                    resumeInfo?.projects.map((pro, index) => (
                        <div
                            key={index}
                            className="mb-2"
                        >
                            <div className="flex justify-between">
                                <div className="flex">
                                    <h2 className="text-sm font-bold mr-1">
                                        {pro.projectName} {" | "}{" "}
                                        <a
                                            href={pro.projectLink}
                                            target="_blank"
                                            className="text-sm font-bold"
                                        >
                                            Link
                                        </a>
                                    </h2>
                                </div>
                                <div className="flex">
                                    {pro?.techUsed.map((tech, j) => (
                                        <h2
                                            key={j}
                                            className="text-sm mt-1 mr-1"
                                        >
                                            {tech}{" "}
                                            {j < pro.techUsed.length - 1 && " , "}
                                        </h2>
                                    ))}
                                </div>
                            </div>
                            {/* <p className="text-xs my-1">{pro.description}</p> */}
                            <div className="text-xs my-1" dangerouslySetInnerHTML={{__html: pro?.description}}/>
                        </div>
                    ))
                ) : (<p className="text-sm text-gray-500">No Projects available</p>)}
            </div>
        </div>
    );
}

export default Projects;
