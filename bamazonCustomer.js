var mysql = require("mysql");

var inquirer = require("inquirer");

require("console.table");

//CONFIGURATION TO CONNECT TO DATABASE
var connection = mysql.createConnection({
    database: "bamazon_db",
    host: "localhost",
    password: "root",
    user: "root",
    port: "8889"
});

//CONNECTING TO DATABASE
connection.connect(function(err){
    if (err) {
        console.log(err);
    } else {
        console.log("Connected");
    }
})