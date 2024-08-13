import { login, UserRegister } from "../controllers/Login and Signup";
import { login} from '../controllers/Login and Signup.js';
import express from 'express';
import { phoneNumberValidator } from "../validators/phoneValidation.js";
import { notEmptyValidate } from "../validators/validationResult.js";

const routes = express.Router();


routes.post('/login', login);
routes.post('/signup',phoneNumberValidator,notEmptyValidate,UserRegister)

// export default routes;
