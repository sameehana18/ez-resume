import React, { useContext, useState } from "react";
import { ResumeInfoContext } from "../../context/ResumeInfoContext.jsx";
import axios from "../../config/axiosConfig.js";
import { useLocation } from "react-router-dom";

function PersonalInfoForm({enableNext}) {
    const location = useLocation();
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        enableNext(false);
        const {name, value} = e.target;

        setResumeInfo(prevResumeInfo => ({
            ...prevResumeInfo,
            personalInfo: {
                ...prevResumeInfo.personalInfo,
                [name]: value
            }
        }));
    };

    const onSave = async (e) => {
        e.preventDefault();
        enableNext(true);
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
            console.log("Personal info saved", response.data);
        } catch (error) {
            console.log("Error saving personal info:", error);
            setLoading(false);
        }
    }

    return (
        <div className="bg-white p-8 shadow-lg rounded-lg border-t-purple-700 border-t-4 mt-10 border-b-purple-700 border-b-4">
            {/* <h2 className='font-bold text-lg'>Personal Info</h2> */}
            <div className="flex items-center">
                <img
                    src="/icons8-user-96.png"
                    alt="Personal Info Icon"
                    className="w-6 h-6 mr-2"
                />
                <h2 className="text-lg font-semibold mb-2 text-gray-700 pt-2">
                    Personal Info
                </h2>
            </div>

            <form onSubmit={onSave}>
                <div className="grid grid-cols-2 gap-3 border border-gray-300 p-4 rounded-lg">
                    <div>
                        <label
                            htmlFor="firstName"
                            className="block py-4 text-gray-700"
                        >
                            First Name
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            required
                            onChange={handleInputChange}
                            defaultValue={resumeInfo?.personalInfo?.firstName}
                            className="w-full rounded-lg text-gray-700 focus:border-purple-500 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-purple-300"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="lastName"
                            className="block py-4 text-gray-700"
                        >
                            Last Name
                        </label>
                        <input
                            type="text"
                            name="lastName"
                            required
                            onChange={handleInputChange}
                            defaultValue={resumeInfo?.personalInfo?.lastName}
                            className="w-full rounded-lg text-gray-700 focus:border-purple-500 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-purple-300"
                        />
                    </div>
                    <div className="col-span-2">
                        <label
                            htmlFor="jobTitle"
                            className="block py-4 text-gray-700"
                        >
                            Job Title
                        </label>
                        <input
                            type="text"
                            name="jobTitle"
                            required
                            onChange={handleInputChange}
                            defaultValue={resumeInfo?.personalInfo?.jobTitle}
                            className="w-full rounded-lg text-gray-700 focus:border-purple-500 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-purple-300"
                        />
                    </div>
                    <div className="col-span-2">
                        <label
                            htmlFor="address"
                            className="block py-4 text-gray-700"
                        >
                            Address
                        </label>
                        <input
                            type="text"
                            name="address"
                            required
                            onChange={handleInputChange}
                            defaultValue={resumeInfo?.personalInfo?.address}
                            className="w-full rounded-lg text-gray-700 focus:border-purple-500 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-purple-300"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="email"
                            className="block py-4 text-gray-700"
                        >
                            Email
                        </label>
                        <input
                            type="text"
                            name="email"
                            required
                            onChange={handleInputChange}
                            defaultValue={resumeInfo?.personalInfo?.email}
                            className="w-full rounded-lg text-gray-700 focus:border-purple-500 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-purple-300"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="phone"
                            className="block py-4 text-gray-700"
                        >
                            Phone Number
                        </label>
                        <input
                            type="text"
                            name="phone"
                            required
                            onChange={handleInputChange}
                            defaultValue={resumeInfo?.personalInfo?.phone}
                            className="w-full rounded-lg text-gray-700 focus:border-purple-500 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-purple-300"
                        />
                    </div>
                    {/* TODO: add links */}
                </div>
                <div className="flex justify-end mt-3">
                    <button
                        className="bg-purple-700 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg float-right mt-2"
                        type="submit"
                        disabled={loading}
                    >   
                        {loading ? "Saving..." : "Save"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default PersonalInfoForm;
