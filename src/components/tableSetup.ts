import { GridColDef } from "@mui/x-data-grid";

export const customerColumns: GridColDef[] = [
    { field: 'id', headerName: 'Customer ID', width: 100, type: 'number' },
    { field: 'email', headerName: 'E-mail', width: 250 },
    { field: 'phone', headerName: 'Phone', width: 200, },
] as const;

export const orderColumns: GridColDef[] = [
    { field: 'id', headerName: 'Order ID', width: 100, type: 'number' },
    { field: 'customer_id', headerName: 'Customer ID', width: 100, type: 'number' },
    { field: 'orderDate', headerName: 'Order Date', width: 250, type: 'string' },
] as const;

export const itemColumns: GridColDef[] = [
    { field: 'id', headerName: 'Item ID', width: 100, type: 'number' },
    { field: 'name', headerName: 'Name', width: 250 },
    { field: 'price', headerName: 'Price', width: 200, type: 'number' },
] as const;

export const ordersItemsColumns: GridColDef[] = [
    { field: 'id', headerName: 'Entry ID', width: 100, type: 'number' },
    { field: 'order_id', headerName: 'Order ID', width: 250, type: 'number' },
    { field: 'item_id', headerName: 'Item ID', width: 200, type: 'number' },
] as const;

export type columns =
    typeof customerColumns |
    typeof orderColumns |
    typeof itemColumns |
    typeof ordersItemsColumns;
