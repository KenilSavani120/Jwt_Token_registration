// routes
import express from 'express';
import { addPhones, deletePhone, getPhones, updatePhone } from '../controllers/phoneController.js';
import { phoneNumberValidator } from '../validators/phoneValidation.js';
import { notEmptyValidate } from '../validators/validationResult.js';
import { login, UserRegister} from '../controllers/Login and Signup.js';
import { authenticateToken } from '../Authentication/auth.js';

const routes = express.Router();

routes.get("/:id?",authenticateToken,getPhones)
routes.post('/login', login);
routes.post('/signup',phoneNumberValidator,notEmptyValidate,UserRegister)
routes.use(authenticateToken); // Apply authentication middleware

routes.post("/",phoneNumberValidator,notEmptyValidate,addPhones)
routes.delete("/:id",deletePhone)
routes.put("/:id",phoneNumberValidator,notEmptyValidate,updatePhone)

export default routes;