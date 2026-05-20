if (process.env.NODE_ENV !== 'production') {
require('dotenv').config({ quiet: true });
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
const secret = process.env.SECRET;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, 'public')));

// app.get('/', (req, res) => {
//     res.send('Hi I am root');
// });

async function startServer() {
    if (!dbUrl) {
        throw new Error("ATLASDB_URL is missing from .env");
    }
    if (!secret) {
        throw new Error("SECRET is missing from .env");
    }

    await mongoose.connect(dbUrl);
    console.log('Connected to MongoDB');

    const store = MongoStore.create({
        client: mongoose.connection.getClient(),
        touchAfter: 24 * 60 * 60, // time period in seconds
    });

    store.on("error", function (e) {
        console.log("SESSION STORE ERROR", e);
    });

    const sessionOptions = {
        store,
        secret,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // 1 week
            maxAge: 1000 * 60 * 60 * 24 * 7
        },
    };

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
}

startServer().catch((err) => {
    console.error('Failed to start server:', err);
    process.exit(1);
});
