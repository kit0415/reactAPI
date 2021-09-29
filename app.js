import {MYSQL_USERNAME,MYSQL_PASSWORD,MYSQL_HOST,MYSQL_DBNAME} from './app/config/dbconfig'

const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const app = express();
var mysql = require('mysql');

// add router in express app
app.use("/",router);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//GET Method 
app.get("/names", (req, res, next) => {
    const jdata = [{
        "name": "Il Brigante",
        "rating": "5.0",
        "match": "87",
        "cuisine": "Italian",
        "imageUrl": "/image-0.png"
    }, {
        "name": "Giardino Doro Ristorante",
        "rating": "5.0",
        "match": "87",
        "cuisine": "Italian",
        "imageUrl": "/image-1.png"
    }];
 res.send(jdata);
});



//POST method
app.post('/login',(req, res) => {
    var user_name = req.body.user;
    var password = req.body.password;
    console.log("User name = "+user_name+", password is " +password);
    //if (user_name == 'yc' && password == '1234'){
     //   res.end("200");
    //}

    var con = mysql.createConnection({
        host: MYSQL_HOST,
        user: MYSQL_USERNAME,
        password: MYSQL_PASSWORD,
        database: MYSQL_DBNAME
      }); 

      var authenticated = new Boolean(false);
      con.query('SELECT 1 as result FROM user where username = "'+user_name+'" AND password = "'+ password+'";', (err,result) => {
        if(err) throw err;
      
        console.log('Data received from Db:' + result[0].result);

        if(result[0].result == 1){
            authenticated = true;
        }
      });
   
      if(authenticated)
        res.sendStatus("200");
      else
        res.sendStatus("404");

    });


    app.listen(3000, () => {
        console.log("Server running on port 3000");
    });