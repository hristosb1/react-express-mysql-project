import { dataState } from "./dataSlice";

export const getTableName = (currentPage: string) => {
    let tableName = '';
    if (currentPage === 'customer') tableName = 'customers';
    if (currentPage === 'order') tableName = 'orders';
    if (currentPage === 'item') tableName = 'items';
    if (currentPage === 'order_item') tableName = 'orders_items';
    if (currentPage === 'home') return '';
    return tableName;
};

const createWarningMessage = (tableCount: number, itemCount: number) =>
    `Entries in ${tableCount} other tables - ${itemCount} items;
    Proceed with deletion?
    `;

export const indexEntriesFromDB = (
    dataState: dataState
) => {

    const { entries, currentPage, selections } = dataState;
    let tableCount = 0;
    let itemCount = 0;

    for (const id of selections) {
        if (currentPage === 'customer') {

            const matchingOrders = entries.orders
                .filter((el) => el.customer_id === id);
            itemCount += matchingOrders.length;
            matchingOrders.length && tableCount++;

            const matchingOIcount = matchingOrders.reduce((acc1, order) => {
                return acc1 + entries.orders_items.reduce((acc2, oi) => {
                    return oi.order_id === order.id ? acc2 + 1 : acc2;
                }, 0);
            }, 0);

            if (matchingOIcount) {
                tableCount++;
                itemCount += matchingOIcount;
            }

        } else if (currentPage === 'order') {
            const matchingOIcount = entries.orders_items
                .reduce((acc, el) => (el.order_id === id ? acc + 1 : acc), 0);

            if (matchingOIcount) {
                tableCount++;
                itemCount += matchingOIcount;
            }
        } else if (currentPage === 'item') {
            const matchingOIcount = entries.orders_items
                .reduce((acc, el) => (el.item_id === id ? acc + 1 : acc), 0);

            if (matchingOIcount) {
                tableCount++;
                itemCount += matchingOIcount;
            }
        }
        return createWarningMessage(tableCount, itemCount);
    }
};