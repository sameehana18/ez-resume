import mongoose from "mongoose";
import { Resume } from "../models/resume.models.js";
import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const createResume = asyncHandler(async (req, res) => {
    const {title} = req.body;
    // console.log("title: ", title);

    const user = await User.findById(req.user._id);

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const userId = user._id;

    try {
        const resume = await Resume.create({
            title,
            owner: userId
        });

        const createdResume = await Resume.findById(resume._id);

        if(!createdResume){
            throw new ApiError(404, "Something went wrong while creating resume");
        }

        return res.status(200)
        .json(new ApiResponse(
            200,
            createdResume,
            "Resume created successfully"
        ))
    } catch (error) {
        console.log("Resume creation error:", error);

        throw new ApiError(500, "Something went wrong while creating resume");
    }
});

const getAllResumesOfUser = asyncHandler(async (req, res) => {
    const userId = req.user?._id;

    if(!userId){
        throw new ApiError(404, "User not found");
    }

    try {
        const resumes = await Resume.find({
            owner: userId
        }).select("-personalInfo -skillset -education -experience -projects -certifications");

        if(!resumes){
            throw new ApiError(404, "Resumes not found");
        }

        return res.status(200)
        .json(new ApiResponse(
            200,
            resumes,
            "Resumes fetched successfully"
        ))
    } catch (error) {
        throw new ApiError(500, "Something went wrong while getting resumes of user");
    }
});

const getResumeWithId = asyncHandler(async (req, res) => {
    const {resumeId} = req.params;

    if(!resumeId){
        throw new ApiError(404, "ResumeId is required");
    }

    try {
        const resume = await Resume.findById(resumeId)
        .select("-personalInfo -skillset -education -experience -projects -certifications");

        if(!resume){
            throw new ApiError(500, "Resume not found");
        }

        return res.status(200)
        .json(new ApiResponse(
            200,
            resume,
            "Resume fetched successfully"
        ));
    } catch (error) {
        throw new ApiError(500, "Something went wrong while getting resume with id");
    }
})

const deleteResume = asyncHandler(async (req, res) => {
    const {resumeId} = req.params;

    if(!resumeId){
        throw new ApiError(404, "ResumeId is required");
    }

    try {
        const resume = await Resume.findByIdAndDelete(resumeId);

        if(!resume){
            throw new ApiError(404, "Resume not found and could not be deleted");
        }

        return res.status(200)
        .json(new ApiResponse(
            200,
            resume._id,
            "Resume deleted successfully"
        ));

    } catch (error) {
        throw new ApiError(500, "Something went wrong while deleting resume");
    }
})

export { createResume, getAllResumesOfUser, getResumeWithId, deleteResume };
