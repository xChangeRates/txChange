const express = require('express');

const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const authController = require('./controllers/authController');
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

// get: user data

// post: create new user

// put: edit user info

// post: user can favorite a country

// delete: user can unFavorite a country

app.listen(PORT, () => console.log(`Server is listening on Port ${PORT}`));