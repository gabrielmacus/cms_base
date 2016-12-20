/**
* Created by Gabriel Macus on 18/12/2016.
*/
var async = require('async');
global.ObjectID = require('mongodb').ObjectID;
var Connection = require('./framework/db/Connection');
var connection = new Connection('localhost','db',27017);


