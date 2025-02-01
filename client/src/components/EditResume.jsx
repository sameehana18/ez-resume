import React, { useState, useEffect } from "react";
import Navbar from "./Navbar.jsx";
import axios from "../config/axiosConfig.js";
import { useLocation } from "react-router-dom";
import FormSection from "./FormSection.jsx";
import ResumePreview from "./ResumePreview.jsx";
import { ResumeInfoContext } from "../context/ResumeInfoContext.jsx";
import Dummy from "./Dummy.jsx";

function EditResume() {
    const location = useLocation();
    const [resumeInfo, setResumeInfo] = useState();
    
    const getResumeInfo = async () => {
        const resumeId = location.pathname.split("/")[3];

        // console.log(resumeId);

        const accessToken = localStorage.getItem("token");
        if(!accessToken){
            console.log("User is not authenticated.");
            return;
        }

        try {
            const response = await axios.get(`/resumes/get/${resumeId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            setResumeInfo({
                personalInfo: response.data.data.personalInfo,
                education: response.data.data.education,
                experience: response.data.data.experience,
                projects: response.data.data.projects,
                certifications: response.data.data.certifications,
                title: response.data.data.title
            });

            console.log("Resume info fetched", response.data);
        } catch (error) {
            console.log(`Error fetching resume with id: ${resumeId}`, error);
        }
    }

    useEffect(() => {
        // setResumeInfo(Dummy);
        getResumeInfo();
    }, []);

    return (
        <>
            <div className="bg-purple-50 h-20 mt-5">
                <h1 className="text-3xl text-gray-700 text-left pl-10 pt-4 inline-block">
                    {resumeInfo?.title}
                </h1>
                {/* <button className="bg-purple-700 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg float-right mr-10 mt-4">
                    Save
                </button> */}
            </div>
            <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
                <div className="grid grid-cols-1 md:grid-cols-2 p-10 gap-10">
                    {/* <div className="flex col-2 gap-10 p-7"> */}
                    <FormSection />
                    <ResumePreview />
                </div>
            </ResumeInfoContext.Provider>
        </>
    );
}

export default EditResume;
