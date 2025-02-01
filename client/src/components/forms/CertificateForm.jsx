import React, { useContext, useEffect, useState} from "react";
import { ResumeInfoContext } from "../../context/ResumeInfoContext";
import { useLocation } from "react-router-dom";
import axios from "../../config/axiosConfig.js";

const createFormField = () => ({
    certificateName: "",
    certificateLink: "",
    issuedBy: "",
});

function CertificateForm() {
    const [certificatesList, setCertificatesList] = useState([
        createFormField(),
    ]);

    const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext);
    const [loading, setLoading] = useState(false);
    const location = useLocation();

    const handleChange = (index, e) => {
        const newEntries = certificatesList.slice();
        const {name, value} = e.target;
        newEntries[index][name] = value;

        setCertificatesList(newEntries);
    }

    const AddNewCertificate = () => {
        setCertificatesList([...certificatesList, createFormField()]);
    }

    const RemoveCertificate = () => {
        setCertificatesList(certificatesList=>certificatesList.slice(0,-1));
    }

    const onSave = async () => {
        const data = {
            data: {
                certifications: certificatesList,
            }
        }

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
            console.log("Certifications info saved", response.data);
        } catch (error) {
            console.log("Error saving certification info:", error);
            setLoading(false);
        }
    }

    useEffect(() => {
        // console.log("experienceList: ", experienceList);
        setResumeInfo({...resumeInfo, certifications: certificatesList});
    }, [certificatesList]);

    useEffect(() => {
        resumeInfo&&setCertificatesList(resumeInfo?.certifications);
    }, [])
    return (
        <div className="bg-white p-8 shadow-lg rounded-lg border-t-purple-700 border-t-4 mt-10 border-b-purple-700 border-b-4">
            {/* <h2 className='font-bold text-lg'>Personal Info</h2> */}
            <div className="flex items-center">
                <img
                    src="/icons8-medal-100.png"
                    alt="Personal Info Icon"
                    className="w-6 h-6 mr-2"
                />
                <h2 className="text-lg font-semibold mb-2 text-gray-700 pt-2">
                    Certifications
                </h2>
            </div>
            <div>
                {certificatesList.map((item, index) => (
                    <div key={index} className="border border-gray-300 p-4 rounded-lg mb-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label
                                    htmlFor="certificateName"
                                    className="block py-4 text-gray-700"
                                >
                                    Certicate Name
                                </label>
                                <input
                                    type="text"
                                    name="certificateName"
                                    required
                                    onChange={(e) => handleChange(index, e)}
                                    defaultValue={item?.certificateName}
                                    className="w-full rounded-lg text-gray-700 focus:border-purple-500 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-purple-300"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="issuedBy"
                                    className="block py-4 text-gray-700"
                                >
                                    Issued By
                                </label>
                                <input
                                    type="text"
                                    name="issuedBy"
                                    required
                                    onChange={(e) => handleChange(index, e)}
                                    defaultValue={item?.issuedBy}
                                    className="w-full rounded-lg text-gray-700 focus:border-purple-500 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-purple-300"
                                />
                            </div>
                            <div className="col-span-2">
                                <label
                                    htmlFor="certificateLink"
                                    className="block py-4 text-gray-700"
                                >
                                    Certicate Link
                                </label>
                                <input
                                    type="text"
                                    name="certificateLink"
                                    required
                                    onChange={(e) => handleChange(index, e)}
                                    defaultValue={item?.certificateLink}
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
                        onClick={AddNewCertificate}
                        className="w-full p-3 font-bold text-xs text-purple-700 border border-purple-700 rounded-lg hover:bg-purple-50"
                    >
                        Add a certificate
                    </button>
                    <button
                        onClick={RemoveCertificate}
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

export default CertificateForm;
