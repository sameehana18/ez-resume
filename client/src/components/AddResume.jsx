import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../config/axiosConfig.js";

function AddResume() {
    const navigate = useNavigate();
    const location = useLocation();
    const [resumes, setResumes] = useState([]);

    const [user, setUser] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("user"));
        if (userData) setUser(userData);
    }, []);

    const getAllResumes = async () => {
        try {
            const accessToken = localStorage.getItem("token");

            if (!accessToken) {
                console.log("User is not authenticated.");
                return;
            }

            const response = await axios.get("/resumes/get-resumes", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            const resumeData = response.data.data;
            // console.log("resume data: ", resumeData);

            setResumes(resumeData);
        } catch (error) {
            console.log("Error fetching resumes:", error);
        }
    };

    useEffect(() => {
        getAllResumes();
    }, [location]);

    const handleAddResume = async (e) => {
        e.preventDefault();
        // Add functionality to open a modal or navigate to the resume creation page

        console.log("create button clicked");

        try {
            setLoading(true);
            const resumeTitle = document.getElementById("resume-name").value;
            // console.log("resume title: ", resumeTitle);

            const accessToken = localStorage.getItem("token");
            // console.log("token: ", accessToken);

            if (!accessToken) {
                throw new Error(
                    500,
                    "token not found in local storage or user is not authenticated"
                );
            }

            const response = await axios.post(
                "/resumes/create-resume",
                {
                    title: resumeTitle,
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            const resumeId = response.data.data._id;
            // console.log(typeof resumeId, "resume id: ", resumeId);

            console.log("resume created successfully");

            navigate(`/dashboard/resume/${resumeId}/edit`); // dashboard/resume/:resumeId/edit
        } catch (error) {
            console.log("Error adding resume:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = () => {
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
        document.getElementById("resume-name").value = "";
    };

    const handleEdit = (id) => {
        console.log("Edit resume:", id);
        // Add edit functionality here
    };

    const handleDelete = (id) => {
        //delete functionality
    };

    return (
        <div>
            <h1 className="text-2xl font-bold w-full mb-4 pl-10 pt-4">
                {user?.username}'s Dashboard
            </h1>
            <div className="bg-gray-100 h-screen w-auto flex flex-wrap gap-4 p-10">
                {/* Add Resume Button */}
                <button
                    onClick={handleOpenModal}
                    className="w-48 h-64 bg-white flex flex-col justify-center items-center shadow-md rounded-lg cursor-pointer hover:shadow-lg hover:bg-gray-200 hover:scale-105 focus:outline-none"
                >
                    <img
                        src="icons8-add-100.png"
                        alt="Add Resume"
                        className="w-12 h-12"
                    />
                    <p className="text-gray-600 mt-2">Add New Resume</p>
                </button>

                {/* add resume Modal */}
                {isModalVisible && (
                    <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50">
                        <div className="relative p-4 w-full max-w-md bg-white rounded-lg shadow dark:bg-gray-700">
                            {/* Modal Header */}
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Create a Resume
                                </h3>
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    <svg
                                        className="w-3 h-3"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 14 14"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                        />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="p-4 md:p-5">
                                <form className="space-y-4">
                                    <div>
                                        <label
                                            htmlFor="resume-name"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Add a title to your resume
                                        </label>
                                        <input
                                            type="text"
                                            name="resume-name"
                                            id="resume-name"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:border-purple-500 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-purple-300"
                                            placeholder="Eg. John Doe's full stack resume"
                                            required
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        onClick={handleAddResume}
                                        className="w-full text-white font-medium text-sm px-5 py-2.5 text-center bg-purple-700 rounded-lg hover:bg-purple-600 focus:outline-none focus:ring focus:ring-purple-300 focus:ring-opacity-50"
                                    >
                                        {loading
                                            ? "Creating Resume..."
                                            : "Create"}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                )}

                {/* Resume history cards */}
                {resumes.map((resume) => (
                    <div
                        key={resume._id} // Use the correct unique field
                        className="relative w-48 h-64 bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg group hover:scale-105 focus:outline-none"
                    >
                        <div className="p-4">
                            <p className="text-gray-700 text-lg font-semibold">
                                {resume.title}
                            </p>
                        </div>
                        <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                className="bg-white p-2 m-2 rounded-full shadow-md hover:bg-gray-200"
                                onClick={() => handleEdit(resume._id)}
                            >
                                <img
                                    src="icons8-edit-500.png"
                                    alt="Edit"
                                    className="w-6 h-6"
                                />
                            </button>
                            <button
                                className="bg-white p-2 m-2 rounded-full shadow-md hover:bg-gray-200"
                                onClick={() => handleDelete(resume._id)}
                            >
                                <img
                                    src="icons8-delete-500.png"
                                    alt="Delete"
                                    className="w-6 h-6"
                                />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AddResume;
