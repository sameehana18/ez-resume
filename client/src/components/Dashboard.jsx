import React, { useState, useEffect } from "react";
import Navbar from "./Navbar.jsx";

function Dashboard() {
    const [resumes, setResumes] = useState([
        { id: 1, name: "Resume 1" },
        { id: 2, name: "Resume 2" },
    ]);

    const handleAddResume = () => {
        console.log("Add Resume button clicked");
        // Add functionality to open a modal or navigate to the resume creation page
    };

    const handleEdit = (id) => {
        console.log("Edit resume:", id);
        // Add edit functionality here
    };

    const handleDelete = (id) => {
        console.log("Delete resume:", id);
        setResumes(resumes.filter((resume) => resume.id !== id));
    };
    return (
        <div>
            <Navbar />
            <div className="bg-gray-100 h-screen w-auto flex flex-wrap gap-4 p-6">
                
                {/* Add new resume button */}
                <button
                    onClick={handleAddResume}
                    className="w-48 h-64 bg-white flex flex-col justify-center items-center shadow-md rounded-lg cursor-pointer hover:shadow-lg hover:bg-gray-200 focus:outline-none"
                >
                    <img
                        src="icons8-add-100.png"
                        alt="Add Resume"
                        className="w-12 h-12"
                    />
                    <p className="text-gray-600 mt-2">Add New Resume</p>
                </button>

                {/* Resume history cards */}
                {resumes.map((resume) => (
                    <div
                        key={resume.id}
                        className="relative w-48 h-64 bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg group"
                    >
                        <div className="p-4">
                            <p className="text-gray-700 text-lg font-semibold">
                                {resume.name}
                            </p>
                        </div>
                        {/* Hover buttons */}
                        <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                className="bg-white p-2 m-2 rounded-full shadow-md hover:bg-gray-200"
                                onClick={() => handleEdit(resume.id)}
                            >
                                <img
                                    src="icons8-edit-500.png"
                                    alt="Edit"
                                    className="w-6 h-6"
                                />
                            </button>
                            <button
                                className="bg-white p-2 m-2 rounded-full shadow-md hover:bg-gray-200"
                                onClick={() => handleDelete(resume.id)}
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

export default Dashboard;
