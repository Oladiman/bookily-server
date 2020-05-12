const passport=require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys=require('../config/keys')
const mongoose=require('mongoose')


const User=mongoose.model('users')


passport.serializeUser((user,done)=>{
    done(null,user.id);
});


passport.deserializeUser((id,done)=>{
    User.findById(id).then(user=>{
        done(null,user);
    });
});

passport.use(new GoogleStrategy({
    clientID: keys.google_client_ID,
    clientSecret:keys.google_client_SECRET,
    callbackURL:"/auth/google/callback"
 },function(accessToken, refreshToken, profile, done) {
     User.findOne({googleID:profile.id}).then(exsistingUser=>{
        if(exsistingUser){
            //we already have a record with the given profile ID
            done(null,exsistingUser);
        }else{
            //we dont have a record with this ID, make a new record
            new User({googleID:profile.id})
            .save()
            .then(user=>done(null,user));
        }
     })

     }))
