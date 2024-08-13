import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import passport from 'passport';
import users from '../Model/userModel.js';

// Replace these with your actual credentials and environment variable setup
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8000/auth/google/redirect", // Update with your callback URL
    passReqToCallback: true
},
    async (request, accessToken, refreshToken, profile, done) => {
        try {
            console.log('User Profile:', profile);

            // Create a user object with available data
            const user = {
                id: profile.id,
                email: profile.emails ? profile.emails[0].value : 'No email available',
                name: profile.displayName,
                picture: profile._json.picture
            };

            const newUser = await users.create({displayName: user.name, email: user.email,});
 

            // For now, we just pass the profile object
            return done(null, profile);
        } catch (err) {
            return done(err, null);
        }
    }
));

// Serialize user information into the session
passport.serializeUser((profile, done) => {
    // Serialize the profile information into the session
    done(null, profile.id); // Serialize just the user ID for simplicity
});

// Deserialize user information from the session
passport.deserializeUser(async (id, done) => {
    try {

        // For this example, just create a mock user object
        done(null, false);
    } catch (err) {
        done(err, null);
    }
});

export default passport;
