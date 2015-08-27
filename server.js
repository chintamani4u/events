// server.js (final)

    // set up ======================================================================
    var express  = require('express');
    var app      = express();                               // create our app w/ express
    var mongoose = require('mongoose');                     // mongoose for mongodb
    var port     = process.env.PORT || 8081;                // set the port
    var database = require('./config/database');            // load the database config
    var morgan = require('morgan');             // log requests to the console (express4)
    var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
    var cors       = require('cors');
    var cookieParser = require('cookie-parser');
    var session = require('express-session');
    var passport = require('passport');
    var router = express.Router();
    var authenticate = require('./app/autheticate')(passport);
    var initPassport = require('./passport-init');  //// Initialize Passport
    initPassport(passport);





    // configuration ===============================================================
    mongoose.connect(database.url);     // connect to mongoDB database

    app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
    app.use(morgan('dev'));
    app.use(cors());                                       // log every request to the console
    app.use(bodyParser.urlencoded({extended:true}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());
    app.use(cookieParser());                                   // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());
    app.use(passport.initialize());
    app.use(passport.session());


    // routes ======================================================================
    require('./app/routes.js')(router);
    app.use('/api', router)
    app.use('/auth', authenticate);



    // listen (start app with node server.js) ======================================
    app.listen(port);
    console.log("event App listening on port " + port);
