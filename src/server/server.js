const express = require('express');

const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const authController = require('./controllers/authController');
const taskController = require('./controllers/taskController')

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));


const PORT = 5000;

app.use('/', express.static('dist'))

app.use('/signup', express.static(path.resolve(__dirname, '../signup.html')));

// post: create new user
app.post('/createUser',
  authController.createNewUser,
  (req, res) => {
    res.send();
})
// get: user login
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

// get: user data

// post: create new user

// put: edit user info

// post: user can favorite a country

// delete: user can unFavorite a country

// post: record transaction

// get: return all transactions



app.listen(PORT, () => console.log(`Server is listening on Port ${PORT}`));