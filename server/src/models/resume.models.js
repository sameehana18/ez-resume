import mongoose, { Schema } from "mongoose";

const resumeSchema = new Schema(
    {
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        title: {
            type: String,
            default: "Untitled Resume",
        },
        personalInfo: {
            firstName: {
                type: String,
            },
            lastName: {
                type: String,
            },
            email: {
                type: String,
                match: [/.+\@.+\..+/, "Please enter a valid email address"],
            },
            phone: {
                type: String,
            },
            address: {
                type: String,
            },
            jobTitle: {
                type: String,
            },
            links: {
                type: [
                    {
                        name: String,
                        url: String,
                    },
                ],
                default: [],
            },
        },
        education: {
            type: [
                {
                    institution: { type: String},
                    location: String,
                    degreeType: String,
                    fieldOfStudy: String,
                    startMonthYear: String,
                    endMonthYear: String,
                    cgpa: Number,
                },
            ],
            default: [],
        },
        experience: {
            type: [
                {
                    employer: String,
                    jobTitle: String,
                    startMonthYear: String,
                    endMonthYear: String,
                    location: String,
                    description: String,
                },
            ],
            default: [],
        },
        projects: {
            type: [
                {
                    projectName: String,
                    techUsed: [String],
                    projectLink: String,
                    description: String,
                },
            ],
            default: [],
        },
        skillset: {
            programmingLanguages: { type: [String], default: [] },
            libraries: { type: [String], default: [] },
            tools: { type: [String], default: [] },
            databases: { type: [String], default: [] },
        },
        certifications: {
            type: [
                {
                    certificateName: String,
                    certificateLink: String,
                    issuedBy: String,
                },
            ],
            default: [],
        },
        resumeFileUrl: { // cloudinary url
            type: String,
        }
    },
    { timestamps: true }
);

export const Resume = mongoose.model("Resume", resumeSchema);
