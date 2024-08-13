const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;


passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL,
  passReqToCallback: true,
},
function(request, accessToken, refreshToken, profile, done,cb) {
  return cb(null, profile);
}));

passport.serializeUser(function(user, done) {
  cb(null, user);
});

passport.deserializeUser(function(user, done) {
  cb(null, user);
});