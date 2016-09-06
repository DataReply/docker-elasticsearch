#!/usr/bin/env node

'use strict';
var http = require('http');
var url = require('url');

var marathonUrl = process.argv[2];
var appId = process.argv[3];

if  (marathonUrl && appId) {
    var taskUrl = marathonUrl + '/v2/apps/' + appId + '/tasks'
    var parsedUrl = url.parse(taskUrl);

    var options = {
      hostname: parsedUrl.hostname,
      port: parsedUrl.port,
      path: parsedUrl.path,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };

    http.get(options, function(res) {
      var data = '';
      res.on('data', function(chunk) {
        data += chunk;
      });
      res.on('end', function(chunk) {
        var apps = JSON.parse(data.toString()).tasks;
        var output = [];
        apps.forEach(function(element, index, array) {
        output.push(element.ipAddresses[0].ipAddress+ ':' + element.ports[1]);



        });
        console.log(output.join(','));
      });
    });
}
