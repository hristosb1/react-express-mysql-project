export type customer = {
    id: number;
    phone: string;
    email: string;
};
export type item = {
    id: number;
    name: string;
    price: string;
};
export type order = {
    id: number;
    orderDate: string;
    customer_id: number;
};
export type order_item = {
    id: number;
    order_id: number;
    item_id: number;
};

export type row = customer | item | order | order_item;

export const isCustomer = (obj: any): obj is customer => (
    typeof obj === 'object' && !!obj['phone']
);

export const isItem = (obj: any): obj is item => (
    typeof obj === 'object' && !!obj['name']

);

export const isOrder = (obj: any): obj is order => (
    typeof obj === 'object' && !!obj['orderDate']
);

export const isOrderItem = (obj: any): obj is order_item => (
    typeof obj === 'object' && !!obj['item_id']
);
