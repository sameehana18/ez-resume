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
    const [deleteModal, setDeleteModal] = useState(false);
    const [resumeToDelete, setResumeToDelete] = useState(null);

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

            setResumes(response.data.data);
        } catch (error) {
            console.log("Error fetching resumes:", error);
        }
    };

    useEffect(() => {
        getAllResumes();
    }, [location]);

    const handleAddResume = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const resumeTitle = document.getElementById("resume-name").value;
            const accessToken = localStorage.getItem("token");
            if (!accessToken) {
                throw new Error("User is not authenticated");
            }

            const response = await axios.post(
                "/resumes/create-resume",
                { title: resumeTitle },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            const resumeId = response.data.data._id;
            navigate(`/dashboard/resume/${resumeId}/edit`);
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

    const handleEdit = async (id) => {
        try {
            const accessToken = localStorage.getItem("token");
            const response = await axios.get(`/resumes/get/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (response.data.statusCode === 200) {
                navigate(`/dashboard/resume/${id}/edit`);
            } else {
                navigate(`/404`);
            }
        } catch (error) {
            console.log("Error editing resume:", error);
        }
    };

    const handleDeleteModal = (id) => {
        setDeleteModal(true);
        setResumeToDelete(id);
    };

    const onDelete = async () => {
        try {
            const accessToken = localStorage.getItem("token");
            if (!accessToken) {
                throw new Error("User is not authenticated");
            }

            await axios.delete(`/resumes/delete/${resumeToDelete}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            console.log("Resume deleted successfully");
            setDeleteModal(false);
            setResumeToDelete(null);
            getAllResumes();
        } catch (error) {
            console.log("Error deleting resume:", error);
        }
    };

    const closeDeleteModal = () => {
        setDeleteModal(false);
        setResumeToDelete(null);
    };

    return (
        <div>
            <h1 className="text-2xl font-bold w-full mb-4 pl-10 pt-4">
                {user?.username}'s Dashboard
            </h1>
            <div className="bg-gray-100 h-screen w-auto flex flex-wrap gap-4 p-10">
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

                {isModalVisible && (
                    <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50">
                        <div className="relative p-4 w-full max-w-md bg-white rounded-lg shadow">
                            <div className="flex items-center justify-between p-4 border-b rounded-t">
                                <h3 className="text-xl font-semibold">
                                    Create a Resume
                                </h3>
                                <button
                                    onClick={handleCloseModal}
                                    className="text-gray-400 hover:text-gray-900"
                                >
                                    ✖
                                </button>
                            </div>
                            <div className="p-4">
                                <form>
                                    <label
                                        htmlFor="resume-name"
                                        className="block mb-2"
                                    >
                                        Add a title to your resume
                                    </label>
                                    <input
                                        type="text"
                                        id="resume-name"
                                        className="block w-full p-2 mb-4"
                                        placeholder="E.g., John Doe's Resume"
                                    />
                                    <button
                                        type="submit"
                                        onClick={handleAddResume}
                                        className="w-full bg-purple-700 text-white py-2 rounded"
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

                {deleteModal && (
                    <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50">
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-lg mb-4">
                                Are you sure you want to delete this resume?
                            </h2>
                            <div className="flex justify-end">
                                <button
                                    onClick={closeDeleteModal}
                                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg mr-2 hover:bg-gray-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={onDelete}
                                    className="bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-600"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {resumes.map((resume) => (
                    <div
                        key={resume._id}
                        className="relative w-48 h-64 bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg"
                    >
                        <div className="p-4">
                            <p className="text-gray-700 text-xl text-bold">{resume.title}</p>
                        </div>
                        <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                            <button
                                onClick={() => handleEdit(resume._id)}
                                className="bg-white p-2 rounded-full shadow-md mx-2"
                            >
                                <img
                                    src="icons8-edit-500.png"
                                    alt="Edit"
                                    className="w-6 h-6"
                                />
                            </button>
                            <button
                                onClick={() => handleDeleteModal(resume._id)}
                                className="bg-white p-2 rounded-full shadow-md mx-2"
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
