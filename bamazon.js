console.log("working");

var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    port: 8889,
    host     : '127.0.0.1',
    user     : 'root',
    password : 'root',
    database : 'bamazondb'
});
   
connection.connect(function(err){
    if (err){
        throw err;
    };
    console.log("You are connected as id: " + connection.threadId);
});

//Very important line methods
var line = {
    plain: function(){
        console.log(" ----------------------------------------------");
    },
    fancy: function(){
        console.log("----------------------------------------------|")
    }
}

displayItems();

function displayItems(){
    connection.query("SELECT * FROM items", function(err, res){
        if(err){
            throw err; 
        }

        line.fancy();
        
        res.forEach(function(thisProduct){
            console.log(thisProduct.product_name);
            console.log("id: " + thisProduct.id);
            console.log("Price: " + thisProduct.price);
            console.log("Amount remaining in stock: " + thisProduct.stock_quantity);
            console.log("Category: " + thisProduct.department_name);
            line.fancy();
        })

        // promptUser();

    });

    promptUser();

}

function promptUser(){
    console.log("Prompting user!");
    inquirer.prompt([
        {
            type: "input",
            message: "What is the id of the item you would like to buy?",
            name: "itemId"
        },
        {
            type: "number",
            message: "How many of this item would you like to buy?",
            name: "itemAmount"
        }
    ]).then(function(userInput){
        verifyPurchase(userInput.itemId, userInput.itemAmount);
    })
}

//This will check if the item exists, and if it is in stock
function verifyPurchase(id, amount){
    console.log("Verifying user purchase!");

    //Does the item exist?;
    connection.query("SELECT * FROM items WHERE id = " + id, function(err, res){
        if(err){
            throw err;
        }
        selectedItem = res[0];
        // if trying to purchase more than amount in stock
        console.log("Selected amount: " + amount);
        console.log("Quantity in stock: " + selectedItem.stock_quantity);
        if(amount > selectedItem.stock_quantity){
            console.log("Not enough " + selectedItem.produce_name + " in stock");
        }
        else{
            console.log("Item purchased: " + selectedItem.product_name);
            console.log("Item price: $" + selectedItem.price);
            console.log("Amount purchased: " + amount);
            console.log("Total price: $" + selectedItem.price * amount);

            updatedStock = selectedItem.stock_quantity - amount;

            updateInventory(id, updatedStock);
        }
    });
}

function updateInventory(id, updatedStock){
    console.log("inside update inventory");
    console.log("id: " + id);
    console.log("updated stock: " + updatedStock);

    connection.query(`UPDATE items SET stock_quantity = '${updatedStock}' WHERE id = '${id}'`);
}