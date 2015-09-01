/// <reference path='../typings/express.d.ts' />
/// <reference path='../typings/body-parser.d.ts' />

import express = require('express');
import bodyParser = require('body-parser');
import Settings = require('./Settings');
import Factions = require('./Factions');

export function start() {
    var app = express();
    app.use(Settings.CONTEXT_PATH, express.static(Settings.FILE_PATHS.RESOURCES_HOME));
    app.use(bodyParser.json()); 

    app.get(Settings.CONTEXT_PATH, (request, response) => {
        response.sendFile(Settings.FILE_PATHS.RESOURCES_HOME + '/index.html');
    });

    app.route(Settings.CONTEXT_PATH + '/faction/:game').get((request, response) => {
        response.json(Factions.getFactionNamesByGame(request.params.game));
    }).post((request, response) => {
        response.json(Factions.getMissionWithFactions(request.params.game, request.body));
    });

    var server = app.listen(Settings.PORT, () => {
        console.log(`Hull Parser is listening in port ${server.address().port}.`);
    });
}