/**
 * Created by Luis Garcia on 18/12/2016.
 */

var MD5 = require("crypto-js/md5");
var mongod = require('../utils/mongod');
var Connection =require('./db/Connection');
var connection = new Connection("localhost",27017,"db");

module.exports= function (name,surname,gender,username,password) {

        this.name= name;
        this.surname=surname;
        this.gender=gender;
        this.username =username;
        this.password=MD5(password).toString();




    connection.insert(this,'usuarios',function(result,err){

        console.log(result);
        console.log(err);
        this.id = result._id;

          if(err)
          {
              throw err;
          }
      });








    }

