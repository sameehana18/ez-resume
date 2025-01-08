import mongoose from "mongoose";
import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { sendEmail } from "../utils/mailer.js";

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(
            500,
            "Something went wrong while generating acess token"
        );
    }
};

const registerUser = asyncHandler(async (req, res) => {
    const { username, fullname, email, password } = req.body;

    if (
        [username, fullname, email, password].some(
            (field) => field?.trim() === ""
        )
    ) {
        throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }],
    });

    if (existedUser) {
        throw new ApiError(
            409,
            "User with this username or email already exists"
        );
    }

    const user = await User.create({
        username: username?.toLowerCase() || "",
        fullname: fullname?.toLowerCase() || "",
        email,
        password,
    });

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while creating user");
    }

    //send verification email
    await sendEmail(email, "VERIFY", user._id);

    return res
        .status(201)
        .json(
            new ApiResponse(200, createdUser, "User registered Successfully")
        );
});

const verifyUser = asyncHandler(async (req, res) => {
    try {
        const { token } = req.query; 
        if (!token) {
            throw new ApiError(400, "Token is required");
        }

        // console.log("Received token:", token);
        const decodedToken = decodeURIComponent(token);
        // console.log("Decoded token:", decodedToken);

        
        // console.log("Looking for user with verificationToken:", decodedToken);
        const user = await User.findOne({
            verificationToken: decodedToken,
            verificationTokenExpiry: { $gt: Date.now() }
        });

        // console.log("User found:", user);

        if (!user) {
            throw new ApiError(404, "User not found or token expired");
        }

        
        if (decodedToken !== user.verificationToken) {
            throw new ApiError(400, "Invalid or expired token");
        }

        
        user.isVerified = true;
        user.verificationToken = null; 
        user.verificationTokenExpiry = null; 
        await user.save();

        return res.status(200).json(new ApiResponse(200, user, "User verified successfully"));

    } catch (error) {
        console.error("Error while verifying user:", error);
        throw new ApiError(500, "Something went wrong while verifying user");
    }
});

const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password){
        throw new ApiError(400, "Email and password are required");
    }

    const user = await User.findOne({email});

    if(!user){
        throw new ApiError(404, "User not found");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if(!isPasswordValid){
        throw new ApiError(401, "Invalid password");
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(
        200,
        {
            user: loggedInUser, accessToken, refreshToken
        },
        "User logged in successfully"
    ))
})

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(
        200,
        {},
        "User logged out successfully"
    ))
})


const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if(!incomingRefreshToken){
        throw new ApiError(401, "Unauthorized request");
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );

        const user = await User.findById(decodedToken?._id);

        if(!user){
            throw new ApiError(401, "Invalid refresh token");
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used")
            
        }

        const options = {
            httpOnly: true,
            secure: true
        };

        const {accessToken, newRefreshToken} = await generateAccessAndRefreshTokens(user._id);

        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(
            new ApiResponse(
                200, 
                {accessToken, refreshToken: newRefreshToken},
                "Access token refreshed"
            )
        )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token");
    }
})

const resetPassword = asyncHandler(async (req, res) => {
    const {email, newPassword, confirmPassword} = req.body;

    const user = await User.findOne({email});

    if(!user){
        throw new ApiError(404, "User not found");
    }

    if(newPassword !== confirmPassword){
        throw new ApiError(400, "Passwords do not match");
    }

    // const isPasswordValid = await user.isPasswordCorrect(newPassword);

    user.password = newPassword;
    await user.save({validateBeforeSave: false});

    return res.status(200)
    .json(new ApiResponse(200, user, "Password reset successfully"));
});



export { registerUser, verifyUser, loginUser, logoutUser, refreshAccessToken, resetPassword };
