const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// Configure Google OAuth Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/api/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Here you would typically:
    // 1. Check if user exists in your database
    // 2. If not, create a new user record
    // 3. Return the user object
    
    // For now, we'll create a user object from Google profile
    const user = {
      id: profile.id,
      name: profile.displayName,
      email: profile.emails[0].value,
      avatar: profile.photos[0].value,
      provider: 'google'
    };
    
    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
}));

// Serialize user for session storage
passport.serializeUser((user, done) => {
  // Store only the user ID in the session
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    // In a real app, you'd fetch the user from database by ID
    // For demo, we'll create a mock user
    const user = {
      id: id,
      name: 'Demo User',
      email: 'demo@teletraan.com'
    };
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;