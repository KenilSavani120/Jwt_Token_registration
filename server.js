import express from "express";
import dotenv from "dotenv";
import connectDb from "./database/db.js";
import routes from "./routes/phone_routes.js";
import passport from 'passport';
import session from "express-session";



import { authenticateToken } from "./Authentication/auth_middalware.js";


dotenv.config();
const app = express();

//Environment variables
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(session({
    secret: process.env.GOOGLE_CLIENT_SECRET, // It's better to have a dedicated session secret
    resave: false,
    saveUninitialized: false
}));

// Initialize passport and configure sessions
app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/google',
    passport.authenticate('google', { scope: [ 'email', 'profile' ] }
  ));
  
  app.get( '/auth/google/callback',
    passport.authenticate( 'google', {
      successRedirect: '/protected',
      failureRedirect: '/auth/google/failure'
    })
  );

// Middleware to parse JSON request bodies
routes.use(authenticateToken);

connectDb()

// Routes
app.use('/phone/v1/',routes)


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});