import express from 'express';
import pool from './pool';
import cors from 'cors';
import { customer, item, order, order_item } from '../components/types';

const app = express();
const port = 8888;

app.use(express.json());
app.use(cors());

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


app.post('/customers-edit', async (req, res) => {
    const { id, email, phone }: customer = req.body;
    try {

        await pool.query(`
            update customers
            set phone = ?, email = ?
            where id = ${id};
            `, [phone, email]);

        res.status(200);
    } catch (error) {
        res.status(500).send(error);
        console.error('Error in edit customer post req\n', error);
    }
});

app.post('/customers-add', async (req, res) => {
    const { email, phone }: customer = req.body;
    try {

        await pool.query(`
            insert into customers (phone, email)
            values(?, ?)
            `, [phone, email]);
        res.status(200);

    } catch (error) {
        res.status(500).send(error);
        console.error('Error in add customer post req\n', error);
    }
});

app.get('/customers', async (_req, res) => {
    try {
        const [data] = await pool.query(`
        select * from customers;
        `);
        res.status(200).send(data);
    } catch (error) {
        console.error('Error in get customers req\n', error);
        res.status(500).send(error);
    }
});

app.delete('/:type', async (req, _res) => {
    const type = req.params.type;
    const ids: number[] = req.body.ids;
    console.log(ids);
    if (!Array.isArray(ids)) console.error('INVALID ID ARRAY DEL REQ');
    try {
        await pool.query(`
        delete from ${type}
        where id in (${ids.join(', ')})
        `);
    } catch (error) {
        console.error('Error in delete req\n', error);
    }
});

app.post('/orders-edit', async (req, res) => {
    const { id, orderDate, customer_id }: order = req.body;
    try {

        await pool.query(`
            update customers
            set orderDate = ?, customer_id = ?
            where id = ${id};
            `, [orderDate, customer_id]);

        res.status(200);
    } catch (error) {
        res.status(500).send(error);
        console.error('Error in edit order post req\n', error);
    }
});

app.post('/orders-add', async (req, res) => {
    const { orderDate, customer_id }: order = req.body;
    try {

        await pool.query(`
            insert into orders (orderDate, customer_id)
            values(?, ?)
            `, [orderDate, customer_id]);
        res.status(200);

    } catch (error) {
        res.status(500).send(error);
        console.error('Error in add order post req\n', error);
    }
});

app.get('/orders', async (_req, res) => {
    try {
        const [data] = await pool.query(`
        select * from orders;
        `);
        res.status(200).send(data);
    } catch (error) {
        console.error('Error in get orders req\n', error);
        res.status(500).send(error);
    }
});

app.post('/items-edit', async (req, res) => {
    const { id, name, price }: item = req.body;
    try {
        await pool.query(`
            update items
            set name = ?, price = ?
            where id = ${id};
            `, [name, price]);

        res.status(200);
    } catch (error) {
        res.status(500).send(error);
        console.error('Error in edit item post req\n', error);
    }
});

app.post('/items-add', async (req, res) => {
    const { name, price }: item = req.body;
    try {

        await pool.query(`
            insert into items (name, price)
            values(?, ?)
            `, [name, price]);
        res.status(200);

    } catch (error) {
        res.status(500).send(error);
        console.error('Error in add item post req\n', error);
    }
});

app.get('/items', async (_req, res) => {
    try {
        const [data] = await pool.query(`
        select * from items;
        `);
        res.status(200).send(data);
    } catch (error) {
        console.error('Error in get items req\n', error);
        res.status(500).send(error);
    }
});

app.post('/oi-edit', async (req, res) => {
    const { id, order_id, item_id }: order_item = req.body;
    try {
        await pool.query(`
            update orders_items
            set order_id = ?, item_id = ?
            where id = ${id};
            `, [order_id, item_id]);

        res.status(200);
    } catch (error) {
        res.status(500).send(error);
        console.error('Error in edit order_item post req\n', error);
    }
});

app.post('/oi-add', async (req, res) => {
    const { order_id, item_id }: order_item = req.body;
    try {

        await pool.query(`
            insert into orders_items (order_id, item_id)
            values(?, ?)
            `, [order_id, item_id]);
        res.status(200);

    } catch (error) {
        res.status(500).send(error);
        console.error('Error in add order_item post req\n', error);
    }
});

app.get('/orders-items', async (_req, res) => {
    try {
        const [data] = await pool.query(`
        select * from orders_items;
        `);
        res.status(200).send(data);
    } catch (error) {
        console.error('Error in get orders_items req\n', error);
        res.status(500).send(error);
    }
});
