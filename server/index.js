require('dotenv').config();

const express = require('express')
    , bodyParser = require('body-parser')
    , session = require('express-session')
    , cors = require('cors')
    , massive = require('massive')
    , moment = require('moment');
const { getUser, getAdmin, updateEdwUser, requestAccess, giveFeedback } = require('./controllers/sharedController');
const { getAllUsers,
        getActiveUser,
        getWishes,
        reserveWish,
        releaseWish,
        getFamilyReference,
        addWish,
        deleteWish,
        updateWish,
        getReservedWishes,
        updateWishesFamily,
        updateWishesUser,
        updateBio,
        getReserverEmail,
        checkEmailBirthdays,
        getAmazonWishes,
        emailReserver } = require('./controllers/wishesController')
const { foodGetActiveUser } = require('./controllers/foodController');
const { checkAuthenticated } = require('./middleware/isAuthenticated');

const app = express();

massive(process.env.CONNECTION_STRING).then( db => {
  app.set('db', db);
})

app.use( bodyParser.json() );
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  if ('OPTIONS' == req.method) {
    res.send(200);
  } else {
      next();
  }
});

const baseUrl = '/api';

// Shared API Endpoints
// app.get(`${baseUrl}/authConfig`, getConfig);
app.get(`${baseUrl}/shared/getAdmin`, checkAuthenticated, getAdmin);
app.post(`${baseUrl}/shared/getuser`, checkAuthenticated, getUser);
app.post(`${baseUrl}/shared/requestAccess`, checkAuthenticated, requestAccess);
app.post(`${baseUrl}/shared/giveFeedback`, checkAuthenticated, giveFeedback);
app.put(`${baseUrl}/shared/updateUser`, checkAuthenticated, updateEdwUser);

// Wishes API Endpoints
app.get(`${baseUrl}/wishes/getAllUsers`, checkAuthenticated, getAllUsers);
app.get(`${baseUrl}/wishes/getFamilyReference`, checkAuthenticated, getFamilyReference);
app.post(`${baseUrl}/wishes/getActiveUser`, checkAuthenticated, getActiveUser);
app.post(`${baseUrl}/wishes/getWishes`, checkAuthenticated, getWishes);
app.post(`${baseUrl}/wishes/reserveWish`, checkAuthenticated, reserveWish);
app.post(`${baseUrl}/wishes/releaseWish`, checkAuthenticated, releaseWish);
app.post(`${baseUrl}/wishes/addWish`, checkAuthenticated, addWish);
app.post(`${baseUrl}/wishes/deleteWish`, checkAuthenticated, deleteWish);
app.put(`${baseUrl}/wishes/updateWish`, checkAuthenticated, updateWish);
app.post(`${baseUrl}/wishes/getReservedWishes`, checkAuthenticated, getReservedWishes);
app.post(`${baseUrl}/shared/getuser`, checkAuthenticated, getUser);
app.put(`${baseUrl}/wishes/updateBio`, checkAuthenticated, updateBio);
app.put(`${baseUrl}/wishes/updateUser`, checkAuthenticated, updateWishesUser);
app.put(`${baseUrl}/wishes/updateFamily`, checkAuthenticated, updateWishesFamily);
app.post(`${baseUrl}/wishes/getReserverEmail`, checkAuthenticated, getReserverEmail);
app.post(`${baseUrl}/wishes/emailReserver`, checkAuthenticated, emailReserver);
app.post(`${baseUrl}/wishes/getAmazonWishes`, checkAuthenticated, getAmazonWishes);

// Food API Endpoints
app.post(`${baseUrl}/food/getActiveUser`, checkAuthenticated, foodGetActiveUser);

const port = process.env.PORT || 3001
app.listen( port , () => { console.log(`Server listening on port ${port}`); } );
