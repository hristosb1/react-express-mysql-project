import { useEffect } from 'react';
import { fetchDataThunk, setCurrentPage } from '../../state/dataSlice';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import DataTable from '../DataTable';
import { ordersItemsColumns } from '../tableSetup';
import OrderItemForm from './OrderItemForm';

const OrderItemPage = () => {
 const { entries, isLoading, error, isEditMode } = useAppSelector(
  (state) => state.data
 );

 const dispatch = useAppDispatch();

 useEffect(() => {
  dispatch(setCurrentPage('order_item'));
  dispatch(fetchDataThunk());
 }, []);

 const dataTable = (
  <DataTable columns={ordersItemsColumns} rows={entries.orders_items} />
 );

 if (entries.orders_items.length)
  return <div>{isEditMode ? <OrderItemForm /> : dataTable}</div>;

 if (isLoading) return <h1>Loading...</h1>;
 if (error) return <h1>{error}</h1>;
};

export default OrderItemPage;
