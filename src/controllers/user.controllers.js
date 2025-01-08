import mongoose from "mongoose";
import {User} from "../models/user.models.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {ApiError} from "../utils/ApiError.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/mailer.js";


const generateAccessAndRefreshTokens = async(userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave: false});

        return {accessToken, refreshToken};


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating acess token");
    }
}

const registerUser = asyncHandler(async (req, res) => {
    const {username, fullname, email, password} = req.body;

    if([username, fullname, email, password].some((field) => field?.trim() === "")){
        throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({
        $or: [{username}, {email}]
    });

    if(existedUser){
        throw new ApiError(409, "User with this username or email already exists");
    }

    const user = await User.create({
        username: username?.toLowerCase() || "",
        fullname: fullname?.toLowerCase() || "",
        email,
        password
    });

    const createdUser = await User.findById(user._id)
        .select("-password -refreshToken");

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while creating user");
    }

    //send verification email
    await sendEmail(email, "VERIFY", user._id);

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )
})

export {registerUser};