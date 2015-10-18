/**
 * Created by nikolay on 01.08.15.
 */
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var init = require('./init');

app.use('/', express.static('public'));

app.use('/:a', function(req, res) {
   res.redirect('/');
});

init(app, io, server);

