var mysql = require("mysql");
var inquirer = require("inquirer");
// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: "",
  database: "bamazon_DB"
});
// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  readProducts();
});
// function readProducts() {
//   connection.query("SELECT id, product_name, department_name, price, stock_quantity FROM products", function(err, res) {
//     if (err) throw err;
//     // Log all results of the SELECT statement
//     console.log(res);
//     connection.end();
//   });
// }

function readProducts() {
  console.log("Selecting all products...\n");
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log(res);
    start()
    // connection.end();
  });
}

function start() {
  inquirer
    .prompt({
      name: "id",
      type: "rawlist",
      message: "Which product id would you like to buy?",
      choices: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    })
    .then(function(answer) {
      // based on their answer, either call the bid or the post functions
      if (answer.productId.toUpperCase() === "POST") {
        postAuction();
      }
      else {
        bidAuction();
      }
    });
}