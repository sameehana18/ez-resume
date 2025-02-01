import React, { useState } from "react";
import PersonalInfoForm from "./forms/PersonalInfoForm.jsx";
import ExperienceForm from "./forms/ExperienceForm.jsx";
import EducationForm from "./forms/EducationForm.jsx";
import SkillsForm from "./forms/SkillsForm.jsx";
import ProjectForm from "./forms/ProjectForm.jsx";
import CertificateForm from "./forms/CertificateForm.jsx";

function FormSection() {
    const [activeFormIndex, setActiveFormIndex] = useState(1);
    const [enableNext, setEnableNext] = useState(false);
    return (
        <div>
            <div className="flex justify-end gap-3">
                {activeFormIndex > 1 && (
                    <button
                        className="bg-purple-700 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg float-right mt-2"
                        onClick={() => setActiveFormIndex(activeFormIndex - 1)}
                    >
                        &#10229;
                    </button>
                )}
                {activeFormIndex < 6 && <button
                    className="bg-purple-700 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg float-right mt-2"
                    onClick={() => setActiveFormIndex(activeFormIndex + 1)}
                    disabled={!enableNext}
                >
                    Next &#10230;
                </button>}
            </div>
            {/* Personal Info */}
            {activeFormIndex==1 ? <PersonalInfoForm enableNext={(v) => setEnableNext(v)}/>:null}
            {/* Education */}
            {activeFormIndex==2 ? <EducationForm enableNext={(v) => setEnableNext(v)}/>:null}
            {/* Experience */}
            {activeFormIndex==3 ? <ExperienceForm enableNext={(v) => setEnableNext(v)}/>:null}
            {/* Projects */}
            {activeFormIndex==4 ? <ProjectForm enableNext={(v) => setEnableNext(v)}/>:null}
            {/* Skills */}
            {activeFormIndex==5 ? <SkillsForm enableNext={(v) => setEnableNext(v)}/>:null}
            {/* Certifications */}
            {activeFormIndex==6 ? <CertificateForm/>:null}
        </div>
    );
}

export default FormSection;
