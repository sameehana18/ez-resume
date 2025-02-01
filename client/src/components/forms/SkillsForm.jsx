import React, { useContext, useEffect, useState } from "react";
import { ResumeInfoContext } from "../../context/ResumeInfoContext";
import { useLocation } from "react-router-dom";
import axios from "../../config/axiosConfig.js";

function SkillsForm() {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [loading, setLoading] = useState(false);
    const location = useLocation();

    const handleChange = (field, value) => {
        // Split values and trim whitespace
        const valuesArray = value.split(",").map((item) => item.trim());

        // Update resumeInfo context
        setResumeInfo((prev) => ({
            ...prev,
            skillset: {
                ...prev.skillset,
                [field]: valuesArray,
            },
        }));
    };

    const onSave = async () => {
        setLoading(true);

        try {
            const resumeId = location.pathname.split("/")[3];
            const accessToken = localStorage.getItem("token");
            if (!accessToken) {
                console.log("User is not authenticated.");
                setLoading(false);
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

            console.log("Skills info saved", response.data);
        } catch (error) {
            console.error("Error saving skills info:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-8 shadow-lg rounded-lg border-t-purple-700 border-t-4 mt-10 border-b-purple-700 border-b-4">
            <div className="flex items-center">
                <img
                    src="/icons8-learning-96.png"
                    alt="Skillset Icon"
                    className="w-6 h-6 mr-2"
                />
                <h2 className="text-lg font-semibold mb-2 text-gray-700 pt-2">
                    Skillset
                </h2>
            </div>

            <div className="border border-gray-300 p-4 rounded-lg">
                {/* Programming Languages */}
                <label htmlFor="programmingLanguages" className="block py-2 text-gray-700">
                    Programming Languages
                </label>
                <input
                    type="text"
                    name="programmingLanguages"
                    placeholder="e.g., Java, C++, Python"
                    required
                    value={resumeInfo.skillset?.programmingLanguages?.join(", ") || ""}
                    onChange={(e) => handleChange("programmingLanguages", e.target.value)}
                    className="w-full rounded-lg text-gray-700 p-2 border focus:border-purple-500 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-purple-300"
                />

                {/* Libraries */}
                <label htmlFor="libraries" className="block py-2 text-gray-700">
                    Libraries
                </label>
                <input
                    type="text"
                    name="libraries"
                    placeholder="e.g., React, Redux, Tailwind"
                    required
                    value={resumeInfo.skillset?.libraries?.join(", ") || ""}
                    onChange={(e) => handleChange("libraries", e.target.value)}
                    className="w-full rounded-lg text-gray-700 p-2 border focus:border-purple-500 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-purple-300"
                />

                {/* Tools */}
                <label htmlFor="tools" className="block py-2 text-gray-700">
                    Tools
                </label>
                <input
                    type="text"
                    name="tools"
                    placeholder="e.g., Git, Docker, VS Code"
                    required
                    value={resumeInfo.skillset?.tools?.join(", ") || ""}
                    onChange={(e) => handleChange("tools", e.target.value)}
                    className="w-full rounded-lg text-gray-700 p-2 border focus:border-purple-500 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-purple-300"
                />

                {/* Databases */}
                <label htmlFor="databases" className="block py-2 text-gray-700">
                    Databases
                </label>
                <input
                    type="text"
                    name="databases"
                    placeholder="e.g., MySQL, MongoDB, PostgreSQL"
                    required
                    value={resumeInfo.skillset?.databases?.join(", ") || ""}
                    onChange={(e) => handleChange("databases", e.target.value)}
                    className="w-full rounded-lg text-gray-700 p-2 border focus:border-purple-500 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-purple-300"
                />
            </div>

            <div className="flex justify-end mt-3">
                <button
                    className="bg-purple-700 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg"
                    type="submit"
                    onClick={onSave}
                    disabled={loading}
                >
                    {loading ? "Saving..." : "Save"}
                </button>
            </div>
        </div>
    );
}

export default SkillsForm;
