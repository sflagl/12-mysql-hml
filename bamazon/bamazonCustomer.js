
// Installs mysql npm package
var mySql = require("mysql");
// Installs inquirer npm package
var inquirer = require("inquirer");

var Table = require('cli-table');

// Connects to supplied path, connect with MySQL Bamazon database.
var connection = mySql.createConnection({
  host: "localhost",
  port: 3306,

  // user name
  user:"root",

  // password + Bamazon database name
  password:"",
  database: "bamazon"
});


var Table = require('cli-table');
var table = new Table({ head: ["Item ID", "Product Name", "Price", "Stock Quantity"] });
 

 
console.log(table.toString());

//Function to display all products
function showAllProducts() {

  connection.query("SELECT * FROM products", function (err,res) {
    if (err) throw err;

    for (var i=0; i < res.length; i++){

      
      console.log( '|    ' +   res[i].item_id   + '    |  ' + res[i].product_name + '   |  ' + res[i].price + '   |  ' + res[i].stock_quantity);
      console.log('_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _\n');
    }

     promptUserPurchase();

  });

}


showAllProducts();

function validateInput(value) {
  var integer = Number.isInteger(parseFloat(value));
  var sign = Math.sign(value);

  if (integer && (sign === 1)) {
    return true;
  } else {
    return 'Please enter a whole non-zero number.';
  }
}


function promptUserPurchase() {


  // Prompt the user to select an item
  inquirer.prompt([
    {
      type: 'input',
      name: 'item_id',
      message: 'Please enter the item id of the product you would like to purchase.',
      validate: validateInput,
      filter: Number
    },
    {
      type: 'input',
      name: 'quantity',
      message: 'How many do you need?',
      validate: validateInput,
      filter: Number
    }
  ]).then(function(input) {

    var item = input.item_id;
    var quantity = input.quantity;

    // Query db to confirm that the given item ID exists in the desired quantity
    var queryStr = 'SELECT * FROM products WHERE ?';

    connection.query(queryStr, {item_id: item}, function(err, data) {
      if (err) throw err;

      if (data.length === 0) {
        console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');

      } 
      else {
        var productData = data[0];
      }

       
      // If the quantity requested by the user is in stock
      if (quantity <= productData.stock_quantity) {

        // Construct the updating query string
        var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item;

        // Update stock

         console.log("\n---------------------------------------------------------------------\n");
        console.log(productData.product_name + ' | Current Stock: ' + (productData.stock_quantity - quantity));

        console.log("\n---------------------------------------------------------------------\n");
          console.log('Your order has been placed! Your total is $' + productData.price * quantity);
          console.log("\n---------------------------------------------------------------------\n");



        connection.query(updateQueryStr, function(err, data) {
          if (err) throw err;
          

          // End the database connection
          connection.end();
        })

      

      } else {
        console.log("\n---------------------------------------------------------------------\n");
        console.log('Sorry, there is not enough product in stock, your order can not be placed as is.');
        console.log('Please modify your order.');
        console.log("\n---------------------------------------------------------------------\n");

        
      }

         // proceed()

         showAllProducts();
     
    })



  })
}

// function proceed() {


//   // Prompt the user to select an item
//   inquirer.prompt([
//     {
//       type: 'confirm',
//       name: 'item_id',
//       message: 'Would you like to purchase something else?',

//       default: true
//     }
//   ]).then(function() {
//       if('y'){
//         showAllProducts();
//         // promptUserPurchase();
//       } else{
//         console.log('Thank you for choosing Bamazon!');
//         console.log('Please come back and see us!');
//       }
//   })
// }



