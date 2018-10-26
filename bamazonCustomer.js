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
/*connection.connect(function(err){
    if (err) {
        console.log(err);
    } else {
        //LOAD TABLE FUNCTION
          //CONNECTION.QUERY...
          //CONNECTION.TABLE...
          //INQUIRER QUESTIONS
          

        console.log("Connected");
    }
})*/

connection.connect(function (err) {
    if (err) {
        return console.log(err);
    } else {
        showProducts();
    };
});

function confirmPurchase() {
    inquirer.prompt([{
        name: "wantPurchase",
        type: "list",
        message: "Would you like to make a purchase?",
        choices: ["Yes", "No"]
    }])
    .then(function (answer) {
        if (answer.wantPurchase === "Yes") {
            promptPurchase();
        } else {
            process.exit(0);
        }
    });
}

function promptPurchase () {
    //Prompt to buy products
    inquirer.prompt([{
        name: "itemId",
        type: "input",
        message: "Please type the Item ID you would like to purchase?",
        validate: function (value) {
            if (isNaN(value) === false) {
                return true;
            } else {
                return false;
            }
        }
    }, {
        name: "quantity",
        type: "input",
        message: "How many would you like to buy?",
        validate: function (value) {
            if (isNaN(value) === false) {
                return true;
            } else {
                return false;
            }
        }
    }]).then(function (answers) {
        var chosenId = answers.itemId;
        var chosenQuantity = answers.quantity;
        purchase(chosenId, chosenQuantity);
    });
}

function showProducts() {
    connection.query("SELECT * FROM products", function(err, result) {
        if (err) {
            return console.log(err);
        } else {
            console.table(result);
            confirmPurchase();
        }
    })
}

///Take order and update DB
function purchase(ID, quantityNeeded) {

    connection.query("SELECT * FROM products WHERE item_id = ? ", [ID], function (err, res) {
        if (err) {
            return console.log(err);
        };
        if (res.length === 0) {
            console.log("That item does not exist.");
            showProducts();
            return;
        }
        
        if (quantityNeeded <= res[0].stock_quantity) {
            var totalCost = res[0].price * quantityNeeded;

        

            //Update quantity in the DB
            connection.query("UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ? ", [quantityNeeded, ID], function (err, res) {
                if (err) {
                    return console.log(err);
                } else {
                    console.log("Your total is $" + totalCost + ". Thank you for your purchase!");
                    showProducts();
                }
            });
            

        } else {
            console.log("We don't have enough of that item to fulfill your order.");
            showProducts();
        };
        //Callback to displayProducts function.
        //displayProducts();
    });
}

//Callback to displayProducts function.
//displayProducts();



