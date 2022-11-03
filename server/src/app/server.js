"use strict";

/* Express web server instellen */
const express = require('express');
const server = express();

const cors = require('cors');
server.use(cors());
server.options('*', cors());	// voor nu even helemaal open zetten

const LOCAL_PORT = "1234";

let dataSet = [];

server.use(express.static('scripts'))

// STATIC FILES HOSTEN:
server.get(['/','/index.html'], function(request, response) {
    console.log('Get of /');
	
	response.sendFile(__dirname + '/index.html');
});

server.get(['/','/main.js'], function(request, response) {
    console.log('Get of /main.js');

    response.sendFile(__dirname + '/main.js');
});

server.get(['/','/cartLib.js'], function(request, response) {
    console.log('Get of /cartLib.js');

    response.sendFile(__dirname + '/cartLib.js');
});

server.get(['/','/listLib.js'], function(request, response) {
    console.log('Get of /listLib.js');

    response.sendFile(__dirname + '/listLib.js');
});

/* Webserver starten */
server.listen(LOCAL_PORT, function() {
    console.log('Server started!');	
});
