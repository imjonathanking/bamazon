DROP DATABASE IF EXISTS bamazonDB;
CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE items(
	id INTEGER NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(60),
    department_name VARCHAR(60),
    price INT,
    stock_quantity INT,
    PRIMARY KEY (id)
);

INSERT 
INTO items 
(product_name, department_name, price, stock_quantity)
VALUES 
('Gatorade', 'Food, Household & Pets', 3, 40),
('Dial Soap', 'Health & Beauty', 6, 50),
('Dryer Sheets', 'Food, Household & Pets', 12, 60),
('Paper Towels', 'Food, Household & Pets', 8, 40),
('Lunchables', 'Food, Household & Pets', 5, 20),
('Bubble Soap', 'Toys & Video Games', 4, 10),
('Printer Paper', 'Electronics & Office', 12, 100),
('Cold Brew Coffee', 'Home, Furniture & Appliances', 4, 50),
('Aluminum Duct Tape', 'Art, Craft, Sewing & Party Supplies', 8, 50),
('Tennis Balls', 'Sports, Fitness & Outdoors', 6, 20);

SELECT * FROM items;