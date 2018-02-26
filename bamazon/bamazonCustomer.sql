-- Drops the animals_db if it exists currently --
DROP DATABASE IF EXISTS bamazon;
-- Creates the "animals_db" database --
CREATE DATABASE bamazon;

-- Makes it so all of the following code will affect animals_db --
USE bamazon;

-- Creates the table "people" within animals_db --
CREATE TABLE products (
  item_id NOT NULL AUTO_INCREMENT,
  -- Makes a string column called "name" which cannot contain null --
  product_name VARCHAR(30) NOT NULL,
  -- Makes a boolean column called "has_pet" which cannot contain null --
  department_name VARCHAR(30) NOT NULL,
  -- Makes a sting column called "pet_name" --
  price INTEGER(40) NOT NULL,
  -- Makes an numeric column called "pet_age" --
  stock_quantity INTEGER(10),
  PRIMARY KEY (item_id)
);

-- Creates new rows containing data in all named columns --
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("tide pods", 'laundry', 10, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("dawn", 'laundry', 6, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("dryer sheets", 'laundry', 4, 300);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("clorox", 'cleaning', 5, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("cheetos", 'food', 13, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("charmin", 'bathroom', 16, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("glasses", 'optical', 34, 300);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("sprite", 'food', 2, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("peanuts", 'food', 3, 300);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("windex", 'automotive', 12, 200);

SELECT * FROM products

-- Updates the row where the column name is peter --
-- UPDATE products
-- SET has_pet = true, pet_name = "Franklin", pet_age = 2
-- WHERE name = "Peter";