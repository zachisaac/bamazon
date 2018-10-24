DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  stock_quantity INT NOT NULL DEFAULT 0,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Television", "Electronics", 100, 20),
       ("Apple Watch", "Electronics", 321.99, 50),
       ("Fit Bit", "Electronics", 199.95, 30),
       ("DJI Drone", "Electronics", 200.95, 15),
       ("Catcher and the Rye", "Books", 19.99, 40),
       ("Grapes of Wrath", "Books", 15.49, 50),
       ("For Whom the Bell Tolls", "Books", 12.99, 30),
       ("Fear and Loathing", "Books", 9.95, 10),
       ("Motor Oil", "Cars", 32.99, 30),
       ("Air Filter", "Cars", 27.99, 70);

