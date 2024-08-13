// routes
import express from 'express';
import { addPhones, deletePhone, getPhones, updatePhone } from '../controllers/phoneController.js';
import { phoneNumberValidator } from '../validators/phoneValidation.js';
import { notEmptyValidate } from '../validators/validationResult.js';
import { login, UserRegister} from '../controllers/Login and Signup.js';
import { authenticateToken } from '../Authentication/auth_middalware.js';
import passport from 'passport';

const routes = express.Router();

// Redirect to Google for authentication
// routes.get('/auth/google', passport.authenticate('google', {
//     scope: ['profile']
// }));

// // Google callback URL
// routes.get('/auth/google/redirect', 
//     passport.authenticate('google', { failureRedirect: '/' }),
//     (req, res) => {
//         // Successful authentication
//         res.redirect('/dashboard'); // Redirect to your desired page
//     }
// );

routes.get("/:id?",authenticateToken,getPhones)
routes.post('/login', login);
routes.post('/signup',phoneNumberValidator,notEmptyValidate,UserRegister)
routes.use(authenticateToken); // Apply authentication middleware

routes.post("/",phoneNumberValidator,notEmptyValidate,addPhones)
routes.delete("/:id",deletePhone)
routes.put("/:id",phoneNumberValidator,notEmptyValidate,updatePhone)

export default routes;