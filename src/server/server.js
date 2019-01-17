const express = require('express');

const { google } = require('googleapis')

const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const authController = require('./controllers/authController');
const oauthController = require('./controllers/oauthController');
const taskController = require('./controllers/taskController');
const cookieController = require('./controllers/cookieController');

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const PORT = 5000;

app.use('/', express.static('dist'))

app.use('/signup', express.static(path.resolve(__dirname, '../signup.html')));

// post: creates a new user. requires 'email', 'password', 'homeCountry' from client
app.post('/createUser',
  authController.createNewUser,
  cookieController.setCookie,
  (req, res) => {
    res.send();
})
// get: user login. requires email and password
app.post('/login',
  authController.authenticateUser,
  (req, res) => {
    res.send();
})

// get: country data
app.get('/testRoute',
  authController.getUserData,
  (req, res) => {
    res.send('you hit it!')
})

// post: record transaction
app.post('/recordTransaction', 
  taskController.recordTransaction,
  (req, res) => {
  res.send()
})

// get: return all user transactions
app.get('/txHistory/:id', 
  taskController.getAllUserTransactions,
  (req, res) => {
})


// const oauth2Client = new google.auth.OAuth2(
//   '43404633949-35k8ru9jcgb1k7r68uj6du05050142qb.apps.googleusercontent.com',
//   'zruCHOKK-rTB4YisbogoMvSQ',
//   'http://127.0.0.1:5000/google/login/callback'
// )

// const SCOPE = [
//   "https://www.googleapis.com/auth/contacts.readonly",
//   "https://www.googleapis.com/auth/userinfo.email",
//   "https://www.googleapis.com/auth/userinfo.profile "
// ];

// const url = oauth2Client.generateAuthUrl({
//   access_type: 'offline',
//   scope: SCOPE
// })

// initiates google oauth
app.get('/google/login', 
  oauthController.generateUrl,
  (req, res) => {
    const { url } = res.locals;
    res.redirect(url);
})

// const setGoogleCredentials = async (req, res, next) => {
//   const { code } = req.query;
//   if (!code) return res.status(400).send('invalid response');
//   else {
//     const { tokens } = await oauth2Client.getToken(code);
//     oauth2Client.setCredentials(tokens);
//     next();
//   }
// }

app.get('/google/login/callback', 
  oauthController.googleOauth,
  (req, res) => {
  res.redirect('/');
})




// get: user data

// post: create new user

// put: edit user info

// post: user can favorite a country

// delete: user can unFavorite a country

app.listen(PORT, () => console.log(`Server is listening on Port ${PORT}`));