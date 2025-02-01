import React, { useContext, useState, useEffect } from "react";
import { ResumeInfoContext } from "../../context/ResumeInfoContext";
import RichTextEditor from "../RichTextEditor";
import { useLocation } from "react-router-dom";
import axios from "../../config/axiosConfig.js";

const createFormField = () => ({
    projectName: "",
    projectLink: "",
    techUsed: [],
    description: "",
});

function ProjectForm() {
    const [projectsList, setProjectsList] = useState([createFormField()]);
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [loading, setLoading] = useState(false);
    const location = useLocation();

    const handleChange = (index, e) => {
        const newEntries = [...projectsList];
        const { name, value } = e.target;

        // Handling 'techUsed' separately to store an array
        if (name === "techUsed") {
            newEntries[index][name] = value.split(",").map((tech) => tech.trim());
        } else {
            newEntries[index][name] = value;
        }

        setProjectsList(newEntries);
    };

    const AddNewProject = () => {
        setProjectsList([...projectsList, createFormField()]);
    };

    const RemoveProject = () => {
        setProjectsList((projectsList) => projectsList.slice(0, -1));
    };

    const onSave = async () => {
        setLoading(true);

        try {
            const resumeId = location.pathname.split("/")[3];

            const accessToken = localStorage.getItem("token");
            if (!accessToken) {
                console.log("User is not authenticated.");
                return;
            }

            const response = await axios.put(
                `/resumes/update/${resumeId}`,
                { ...resumeInfo, projects: projectsList },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            setLoading(false);
            console.log("Project info saved", response.data);
        } catch (error) {
            console.log("Error saving project info:", error);
            setLoading(false);
        }
    };

    const handleRichTextEditor = (e, name, index) => {
        const newEntries = [...projectsList];
        newEntries[index][name] = e;
        setProjectsList(newEntries);
    };

    useEffect(() => {
        setResumeInfo({ ...resumeInfo, projects: projectsList });
    }, [projectsList]);

    useEffect(() => {
        resumeInfo&&setProjectsList(resumeInfo?.projects);
    }, [])

    return (
        <div className="bg-white p-8 shadow-lg rounded-lg border-t-purple-700 border-t-4 mt-10 border-b-purple-700 border-b-4">
            <div className="flex items-center">
                <img
                    src="/icons8-project-100.png"
                    alt="Project Icon"
                    className="w-6 h-6 mr-2"
                />
                <h2 className="text-lg font-semibold mb-2 text-gray-700 pt-2">
                    Projects
                </h2>
            </div>
            <div>
                {projectsList.map((project, index) => (
                    <div key={index} className="border border-gray-300 p-4 rounded-lg mb-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label htmlFor="projectName" className="block py-4 text-gray-700">
                                    Project Name
                                </label>
                                <input
                                    type="text"
                                    name="projectName"
                                    required
                                    value={project.projectName}
                                    defaultValue={project?.projectName}
                                    onChange={(e) => handleChange(index, e)}
                                    className="w-full rounded-lg text-gray-700 focus:border-purple-500 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-purple-300"
                                />
                            </div>
                            <div>
                                <label htmlFor="projectLink" className="block py-4 text-gray-700">
                                    Project Link
                                </label>
                                <input
                                    type="text"
                                    name="projectLink"
                                    required
                                    value={project.projectLink}
                                    defaultValue={project?.projectLink}
                                    onChange={(e) => handleChange(index, e)}
                                    className="w-full rounded-lg text-gray-700 focus:border-purple-500 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-purple-300"
                                />
                            </div>
                            <div className="col-span-2">
                                <label htmlFor="techUsed" className="block py-4 text-gray-700">
                                    Tech Used
                                </label>
                                <input
                                    type="text"
                                    name="techUsed"
                                    required
                                    value={project.techUsed.join(", ")}
                                    defaultValue={project?.techUsed.join(", ")}
                                    onChange={(e) => handleChange(index, e)}
                                    className="w-full rounded-lg text-gray-700 focus:border-purple-500 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-purple-300"
                                />
                                <p className="text-xs text-gray-500 mt-1">Enter technologies separated by commas.</p>
                            </div>
                            <div className="col-span-2 my-3">
                                <RichTextEditor
                                    index={index}
                                    onRichTextEditorChange={(event) =>
                                        handleRichTextEditor(event, "description", index)
                                    }
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-between">
                <div className="flex gap-4 mt-4">
                    <button
                        onClick={AddNewProject}
                        className="w-full p-3 font-bold text-xs text-purple-700 border border-purple-700 rounded-lg hover:bg-purple-50"
                    >
                        Add a project
                    </button>
                    <button
                        onClick={RemoveProject}
                        className="w-1/4 flex justify-center items-center"
                    >
                        <img
                            src="/icons8-delete-500.png"
                            alt="Delete"
                            className="h-8 w-8"
                        />
                    </button>
                </div>
                <div className="flex mt-3">
                    <button
                        className="bg-purple-700 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg float-right mt-2"
                        type="submit"
                        disabled={loading}
                        onClick={onSave}
                    >
                        {loading ? "Saving..." : "Save"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProjectForm;
