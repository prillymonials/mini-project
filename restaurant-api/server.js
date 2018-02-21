'use strict';

var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');

var app = express();

// Body parser middleware
app.use( bodyParser.json() );     
app.use(bodyParser.urlencoded({
  extended: true
})); 

// CORS middleware
app.use(cors());

// Route GET Restaurant
app.route('/restaurants')
    .get(function(request, response) {
        response.json( require('./data/restaurants.json') );
    });

// Route GET Restaurant by ID
app.route('/restaurants/:id')
    .get(function(request, response) {
        var restaurantDetail = require('./data/restaurantDetail.json');
        var restaurantId = request.params.id;
        var restaurant = restaurantDetail[restaurantId];

        if (restaurant === undefined) {
            response.status(400).json({ status: 'error', message: 'Restaurant not found.' });
            return;
        }

        response.json({
            status: 'ok',
            data: restaurant
        });
    });

app.route('/restaurants/:id/reserve')
    .post(function(request, response) {
        var restaurantDetail = require('./data/restaurantDetail.json');
        var restaurantId = request.params.id;
        var restaurant = restaurantDetail[restaurantId];

        if (restaurant === undefined) {
            response.status(400).json({ status: 'error', message: 'Restaurant not found.' });
            return;
        }

        const body = request.body;
        if (body.name.trim() === '') {
            response.status(400).json({ status: 'error', message: 'Field name is required.' });
            return;
        }
        if (body.email.trim() === '') {
            response.status(400).json({ status: 'error', message: 'Field email is required.' });
            return;
        }
        if (body.phone.trim() === '') {
            response.status(400).json({ status: 'error', message: 'Field phone is required.' });
            return;
        }
        if (body.total_guest.trim() === '') {
            response.status(400).json({ status: 'error', message: 'Field no of guest is required.' });
            return;
        }

        response.json({ status: 'ok', response: request.body });
    });

// Public middleware
app.use('/public', express.static('public'))

// Not found middleware
app.use(function(req, res, next) {
    if (!req.route) {
        return next (new Error('Route not found.'));  
    }
    next();
});

app.use(function(err, req, res, next){
    res.status(400).json({
        status: 'error',
        message: err.message
    });
})

// Starting the API app with port 3001
app.listen(3001, function() {
    console.info('Your app is running on http://localhost:3001');
});