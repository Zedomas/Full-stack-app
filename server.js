const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const app = express();

const session = require('express-session')

const db = mongoose.connection;
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/'+`chicagoBars`;

// Connect to Mongo
mongoose.connect(MONGODB_URI ,  { 
    useNewUrlParser: true, useUnifiedTopology: true 
});



// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

// open the connection to mongo
db.on('open' , ()=>{});

//___________________
//Middleware
//___________________

app.use(express.static('Public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));

app.use(
    session({
        secret: process.env.SECRET || "fallback", //a random string do not copy this value or your stuff will get hacked
        resave: false, // default more info: https://www.npmjs.com/package/express-session#resave
        saveUninitialized: false // default  more info: https://www.npmjs.com/package/express-session#resave
      })
)

const barController = require('./controller/barsController.js');
app.use('/bars', barController)

const users = require('./controller/users.js')
app.use('/users', users)

const searchController = require('./controller/search.js');
app.use('/search', searchController);


const sessionController = require('./controller/sessions.js');
app.use('/sessions', sessionController);

app.use('/', (req, res) => {
    res.render('landing.ejs', {
        currentUser: req.session.currentUser
    })
})

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));