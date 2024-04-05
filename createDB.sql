create database school_db;
use school_db;
create table customers (
id int primary key auto_increment,
phone varchar(10) not null,
email varchar(255) not null
);

create table orders (
id int primary key auto_increment,
orderDate timestamp default current_timestamp not null,
customer_id int not null,
foreign key(customer_id) references customers(id) on delete cascade
);

create table items (
id int primary key auto_increment,
name varchar(255) not null,
price varchar(255) not null
);

create table orders_items (
id int primary key auto_increment,
order_id int not null,
item_id int not null,
foreign key (order_id) references orders(id) on delete cascade,
foreign key (item_id) references items(id) on delete cascade
);

