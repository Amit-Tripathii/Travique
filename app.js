if (process.env.NODE_ENV !== 'production') {
require('dotenv').config();
}
// require('dotenv').config();



const express = require('express');
const app = express();
const mongoose = require('mongoose');
const ejs = require('ejs');

const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const wrapAsync = require('./utils/wrapAsync.js');
const ExpressError = require('./utils/ExpressError.js');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user.js');

const listingRouter = require('./routes/listing.js');
const reviewRouter = require('./routes/review.js');
const userRouter= require('./routes/user.js');


const dbUrl = process.env.ATLASDB_URL;

main()
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log('Error connecting to MongoDB', err);
    });
async function main() {
    await mongoose.connect(dbUrl);
}

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, 'public')));

const store = MongoStore.create({
    mongoUrl: dbUrl,
    touchAfter: 24 * 60 * 60, // time period in seconds
    
         secret: process.env.SECRET,
    
});

store.on("error", function (e) {
    console.log("SESSION STORE ERROR", e);
});

const sessionOptions = {
     store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // 1 week
        maxAge: 1000 * 60 * 60 * 24 * 7
    },
};



// app.get('/', (req, res) => {
//     res.send('Hi I am root');
// });

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    // console.log(res.locals.success);
    res.locals.error = req.flash('error');
    res.locals.currUser = req.user;
    next();
});

// app.get('/demoUser', async (req, res) => {
//     const user = new User({
//         email: 'demo@example.com',
//         username: 'demoUser'
//     });
//     let registeredUser = await User.register(user, 'helloworld');
//     res.send(registeredUser);
// });




app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);



app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
});

app.use((err, req, res, next) => {

    if (res.headersSent) {
        return next(err);
    }

    let { statusCode = 500, message = "Something went wrong!" } = err;

    return res.status(statusCode).render("error", { err });
});

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});