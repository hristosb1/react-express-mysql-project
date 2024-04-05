import { customer, item, order, order_item } from "../components/types";
import { dataState } from "../state/dataSlice";

const fetchCustomers = async () => {
    const response = await fetch('http://localhost:8888/customers');
    if (!response.ok) {
        throw new Error('_Failed to fetch customers');
    }
    const data: customer[] = await response.json();
    return data;
};

const fetchOrders = async () => {
    const response = await fetch('http://localhost:8888/orders');
    if (!response.ok) {
        throw new Error('_Failed to fetch orders');
    }
    const data: order[] = await response.json();
    return data;
};

const fetchItems = async () => {
    const response = await fetch('http://localhost:8888/items');
    if (!response.ok) {
        throw new Error('_Failed to fetch items');
    }
    const data: item[] = await response.json();
    return data;
};

const fetchOrders_Items = async () => {
    const response = await fetch('http://localhost:8888/orders-items');
    if (!response.ok) {
        throw new Error('_Failed to fetch orders-items');
    }
    const data: order_item[] = await response.json();
    return data;
};

export const fetchData = async (): Promise<dataState['entries']> => {
    return {
        customers: await fetchCustomers(),
        orders: await fetchOrders(),
        items: await fetchItems(),
        orders_items: await fetchOrders_Items(),
    };
};

export const POST = async (url: string, body: Record<any, any>) => {
    await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).catch((err) => console.error(err));
};

export const deleteRecords = async (data: dataState) => {
    const { currentPage, selections } = data;
    console.log(selections);
    let table = '';
    if (currentPage === 'customer') table = 'customers';
    if (currentPage === 'order') table = 'orders';
    if (currentPage === 'item') table = 'items';
    if (currentPage === 'order_item') table = 'orders_items';
    if (currentPage === 'home') return;
    for (const id of selections) {
        console.log(id);
        await fetch(`http://localhost:8888/${table}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id })
        });
    }
};