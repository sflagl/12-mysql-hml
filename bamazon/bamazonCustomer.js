
// Installs mysql npm package
var mySql = require("mysql");
// Installs inquirer npm package
var inquirer = require("inquirer");

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

connection.connect(function(err){
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  showAllProducts();
});

connection.query('select * from products where unit_id = /', function(err, rows){

})

//Function to display all products
function showAllProducts () {

  connection.query("SELECT * FROM products", function (err,res) {
    if (err) throw err;
    for (var i=0; i < res.length; i++){
      console.log('___________________________');
      console.log(res[i].item_id + " | " + res[i].product_name + " | " +res[i].price + " | " + res[i].stock_quantity);
    }
  });
}


showAllProducts ();



function userProductRequest(){
  inquirer.prompt([
    /* Pass your questions in here */
    {
      name: 'item_id',
      message: 'Please enter in the item id of the product you would like to purchase.',
      type: 'input',
      validate: function(){
        if(input = res[i].item_id){

          console.log('Yes!')

        } 
      }
    }

    ])
}

userProductRequest();