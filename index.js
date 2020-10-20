// Example express application adding the parse-server module to expose Parse
// compatible API routes.

var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var ParseDashboard = require('parse-dashboard');
var path = require('path');
require("dotenv").config();


var api = new ParseServer({
  databaseURI: process.env.DB_URI,
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID,
  masterKey: process.env.MASTER_KEY, 
  serverURL: process.env.SERVER_URL,
  fileKey: process.env.FILE_KEY
});


var options = { allowInsecureHTTP: false };


var dashboard = new ParseDashboard(
  {
    apps: [
      {
        serverURL: `${process.env.SERVER_URL}/parse`,
        appId: process.env.APP_ID,
        masterKey: process.env.MASTER_KEY,
        appName: process.env.APP_NAME
      }
    ],
    // users: [
    //   {
    //     user: process.env.masterUsername,
    //     pass: process.env.masterPassword
    //   }
    // ]
  },
  options
);
var app = express();

// Serve static assets from the /public folder
app.use('/public', express.static(path.join(__dirname, '/public')));

// Serve the Parse API on the /parse URL prefix
app.use("/parse", api);

// Parse Server plays nicely with the rest of your web routes
app.get('/', function(req, res) {
  res.status(200).send('I dream of being a website.  Please star the parse-server repo on GitHub!');
});

// There will be a test page available on the /test path of your server url
// Remove this before launching your app
app.get('/test', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/test.html'));
});

var port = process.env.PORT || 5000;
var httpServer = require('http').createServer(app);
httpServer.listen(port, function() {
    console.log('parse-server-example running on port ' + port + '.');
});

app.use('/dashboard', dashboard);


// This will enable the Live Query real-time server
ParseServer.createLiveQueryServer(httpServer);
