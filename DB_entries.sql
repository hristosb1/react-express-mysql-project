-- Inserting data into the customers table
INSERT INTO customers (phone, email) VALUES
('1234567890', 'customer1@example.com'),
('2345678901', 'customer2@example.com'),
('3456789012', 'customer3@example.com'),
('4567890123', 'customer4@example.com'),
('5678901234', 'customer5@example.com'),
('6789012345', 'customer6@example.com'),
('7890123456', 'customer7@example.com'),
('8901234567', 'customer8@example.com'),
('9012345678', 'customer9@example.com'),
('0123456789', 'customer10@example.com');

-- Inserting data into the orders table
INSERT INTO orders (orderDate, customer_id) VALUES
('2024-04-01 08:30:00', 1),
('2024-04-01 09:45:00', 1),
('2024-04-02 10:15:00', 2),
('2024-04-02 11:30:00', 3),
('2024-04-03 12:45:00', 4),
('2024-04-04 08:30:00', 5),
('2024-04-04 09:45:00', 6),
('2024-04-05 10:15:00', 7),
('2024-04-05 11:30:00', 8),
('2024-04-06 12:45:00', 9);

-- Inserting data into the items table
INSERT INTO items (name, price) VALUES
('Item 1', '10.99'),
('Item 2', '20.49'),
('Item 3', '15.75'),
('Item 4', '8.99'),
('Item 5', '12.25'),
('Item 6', '14.99'),
('Item 7', '22.49'),
('Item 8', '18.75'),
('Item 9', '7.99'),
('Item 10', '9.25');

-- Inserting data into the orders_items table
INSERT INTO orders_items (order_id, item_id) VALUES
(1, 1),
(1, 2),
(2, 3),
(3, 1),
(3, 4),
(4, 2),
(5, 5),
(5, 3),
(5, 4),
(6, 1),
(6, 2),
(7, 3),
(7, 4),
(8, 1),
(8, 5),
(9, 2),
(9, 3),
(9, 4),
(10, 5),
(10, 1);