import React, { useContext, useEffect, useState } from "react";
import { ResumeInfoContext } from "../../context/ResumeInfoContext";
import { useLocation } from "react-router-dom";
import axios from "../../config/axiosConfig.js";

const createFormField = () => ({
    institution: "",
    location: "",
    degreeType: "",
    fieldOfStudy: "",
    startMonthYear: "",
    endMonthYear: "",
    cgpa: "",
});

function EducationForm() {
    const [educationalList, setEducationalList] = useState([createFormField()]);
    const [loading, setLoading] = useState(false);
    const location = useLocation();

    const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext);

    const handleChange = (index, e) => {
        const newEntries = educationalList.slice();
        const {name, value} = e.target;
        newEntries[index][name] = value;

        setEducationalList(newEntries);
    };

    const AddNewEducation = () => {
        setEducationalList([...educationalList, createFormField()]);
    }

    const RemoveEducation = () => {
        setEducationalList(educationalList=>educationalList.slice(0,-1));
    }

    const onSave = async () => {
        const data = {
            data: {
                education: educationalList,
            }
        };

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
                resumeInfo,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            setLoading(false);
            console.log("Educational info saved", response.data);
        } catch (error) {
            console.log("Error saving educational info:", error);
            setLoading(false);
        }
    }

    useEffect(() => {
        setResumeInfo({...resumeInfo, education: educationalList});
    }, [educationalList]);

    useEffect(() => {
        resumeInfo&&setEducationalList(resumeInfo?.education);
    }, [])

    return (
        <div className="bg-white p-8 shadow-lg rounded-lg border-t-purple-700 border-t-4 mt-10 border-b-purple-700 border-b-4">
            {/* <h2 className='font-bold text-lg'>Personal Info</h2> */}
            <div className="flex items-center">
                <img
                    src="/icons8-education-100.png"
                    alt="Personal Info Icon"
                    className="w-6 h-6 mr-2"
                />
                <h2 className="text-lg font-semibold mb-2 text-gray-700 pt-2">
                    Education
                </h2>
            </div>
            <div>
                {educationalList.map((item, index) => (
                    <div key={index} className="border border-gray-300 p-4 rounded-lg mb-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label
                                    htmlFor="institution"
                                    className="block py-4 text-gray-700"
                                >
                                    Institution
                                </label>
                                <input
                                    type="text"
                                    name="institution"
                                    required
                                    onChange={(e) => handleChange(index, e)}
                                    defaultValue={item?.institution || ""}
                                    className="w-full rounded-lg text-gray-700 focus:border-purple-500 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-purple-300"
                                />
                            </div>
                            <div >
                                <label
                                    htmlFor="location"
                                    className="block py-4 text-gray-700"
                                >
                                    Location
                                </label>
                                <input
                                    type="text"
                                    name="location"
                                    required
                                    onChange={(e) => handleChange(index, e)}
                                    defaultValue={item?.location || ""}
                                    className="w-full rounded-lg text-gray-700 focus:border-purple-500 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-purple-300"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="degreeType"
                                    className="block py-4 text-gray-700"
                                >
                                    Degree Type
                                </label>
                                <input
                                    type="text"
                                    name="degreeType"
                                    required
                                    onChange={(e) => handleChange(index, e)}
                                    defaultValue={item?.degreeType || ""}
                                    className="w-full rounded-lg text-gray-700 focus:border-purple-500 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-purple-300"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="fieldOfStudy"
                                    className="block py-4 text-gray-700"
                                >
                                    Field of Study
                                </label>
                                <input
                                    type="text"
                                    name="fieldOfStudy"
                                    required
                                    onChange={(e) => handleChange(index, e)}
                                    defaultValue={item?.fieldOfStudy || ""} 
                                    className="w-full rounded-lg text-gray-700 focus:border-purple-500 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-purple-300"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="startMonthYear"
                                    className="block py-4 text-gray-700"
                                >
                                    Start Month/Year
                                </label>
                                <input
                                    type="text"
                                    name="startMonthYear"
                                    required
                                    onChange={(e) => handleChange(index, e)}
                                    defaultValue={item?.startMonthYear || ""}
                                    className="w-full rounded-lg text-gray-700 focus:border-purple-500 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-purple-300"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="endMonthYear"
                                    className="block py-4 text-gray-700"
                                >
                                    End Month/Year
                                </label>
                                <input
                                    type="text"
                                    name="endMonthYear"
                                    required
                                    onChange={(e) => handleChange(index, e)}
                                    defaultValue={item?.endMonthYear || ""}
                                    className="w-full rounded-lg text-gray-700 focus:border-purple-500 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-purple-300"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="cgpa"
                                    className="block py-4 text-gray-700"
                                >
                                    CGPA
                                </label>
                                <input
                                    type="text"
                                    name="cgpa"
                                    required
                                    onChange={(e) => handleChange(index, e)}
                                    defaultValue={item?.cgpa || ""}
                                    className="w-full rounded-lg text-gray-700 focus:border-purple-500 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-purple-300"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-between">
                <div className="flex gap-4 mt-4">
                    <button
                        onClick={AddNewEducation}
                        className="w-full p-3 font-bold text-xs text-purple-700 border border-purple-700 rounded-lg hover:bg-purple-50"
                    >
                        Add an institution
                    </button>
                    <button
                        onClick={RemoveEducation}
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

export default EducationForm;
