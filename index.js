const express=require('express')
const mongoose=require('mongoose')
const cookieSession=require('cookie-session')
const passport=require('passport')
const keys=require('./config/keys')
require('./models/user')
require('./services/passport')


//connecting db
mongoose.connect(keys.connectionString,{ useNewUrlParser: true, useUnifiedTopology: true });

   //starting express app
const app=express()

 app.use(
    cookieSession({
       maxAge:2592000000,
       keys:[keys.cookieKey]
    })
 );

app.use(passport.initialize());
app.use(passport.session());

//requiring and using authentication routes
require('./routes/authRoutes')(app)


const PORT =process.env.PORT||3000
app.listen(PORT)
