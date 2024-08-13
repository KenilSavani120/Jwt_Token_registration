import phones from "../Model/model.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { StatusCodes } from 'http-status-codes';
// import { hashPassword } from "../Authentication/authUtils.js";
import JWT from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();


export const authorization = async (req, res, next) => {
    try {
      const authHeader = req.headers['authorization'];
      if (!authHeader) {
        return res.status(401).send({
          success: false,
          message: 'Authorization header is missing',
        });
      }
  
      const token = authHeader.split(' ')[1]; // Extract the token
      if (!token) {
        return res.status(401).send({
          success: false,
          message: 'Token is missing',
        });
      }
  
      JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
        if (err) {
          return res.status(401).send({
            success: false,
            message: 'Un-Authorized User',
          });
        } else {
          req.body.id = decode.id;
          next();
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        success: false,
        message: 'Please provide Auth Token',
        error,
      });
    }
  };
  


export const UserRegister = async (req, res) => {
  try {
        // const { phoneNumber, password } = req.body;


        
        // Check if the phone number already exists
        
        const numberExist = await phones.findOne({ phoneNumber });
        if (numberExist) {
            return res.status(400).send({
                message: "Phone number exists, try a different phone number"
            });
        }

        // Ensure the password is provided
        if (!password) {
            return res.status(400).send({
                message: "Password is required"
            });
        }

        // Hash the password
        const hashedPassword = await hashPassword(password);

        // Create and save the new phone entry
        const newPhone = await phones.create({ ...req.body, password: hashedPassword });
        return res.status(200).json({
            data: newPhone,
            message: "Phone added successfully"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Error in Add Phone function"
        });
    }}


export const login = async (req, res) => {
    try {
        const { phoneNumber, password } = req.body;

        // Validation
        if (!phoneNumber || !password) {
            return res.status(StatusCodes.BAD_REQUEST).send({
                success: false,
                message: "Please provide phoneNumber and password",
            });
        }

        // Check user
        const user = await phones.findOne({ phoneNumber });
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).send({
                success: false,
                message: "User not found",
            });
        }

        // Check user password | Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(StatusCodes.UNAUTHORIZED).send({
                success: false,
                message: "Invalid credentials",
            });
        }

     // Generate tokens
const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '455s',
});

const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '60s',
});

// Decode the tokens to get expiration times
const accessTokenPayload = JWT.decode(accessToken);
const refreshTokenPayload = JWT.decode(refreshToken);

// Get current time in seconds
const currentTime = Math.floor(Date.now() / 1000);

// Calculate time remaining for access token and refresh token
const accessTokenExpiresIn = accessTokenPayload.exp - currentTime;
const refreshTokenExpiresIn = refreshTokenPayload.exp - currentTime;

// Clear sensitive data
user.password = undefined;

// Respond with tokens and user info
res.status(StatusCodes.OK).send({
    success: true,
    message: "Login successful",
    accessToken,
    refreshToken,
    user,
    accessTokenExpiresIn, // Time remaining in seconds
    refreshTokenExpiresIn, // Time remaining in seconds
});

    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            success: false,
            message: "Error in login API",
            error: error.message,
        });
    }
};