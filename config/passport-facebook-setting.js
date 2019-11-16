const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const keys = require('./key');
const User = require('../model/User');

passport.serializeUser((user, done) => {
    done(null, user.id);   
});

passport.deserializeUser((id, done) => {  
  User.findById(id).then((user) => {
      done(null, user);
  });
});
passport.use(
  new FacebookStrategy({
        clientID: keys.facebook.clintID,
        clientSecret: keys.facebook.clintSecret,
        callbackURL: "http://localhost:3000/auth/facebook/callback",
        profileFields: ['id', 'displayName', 'name', 'gender', 'picture.type(large)']
  }, (accessToken, refreshToken, profile, done) => {

      User.findOne({ facebookID : profile.id}).then((currentUser)=>{
               if(currentUser){
   
              done(null, currentUser);
          }else{
              new User({
                facebookID: profile.id,
                name: profile.displayName,
                image: profile.photos[0].value,
                provider:'facebook'
               })
               .save().then((newUser)=>{
                   done(null, newUser);
                  })
          }
      })

      
  })
);
