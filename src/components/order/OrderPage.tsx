import { useEffect } from 'react';
import { fetchDataThunk, setCurrentPage } from '../../state/dataSlice';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import DataTable from '../DataTable';
import { orderColumns } from '../tableSetup';
import OrderForm from './OrderForm';
import moment from 'moment';
import { order } from '../types';

const OrderPage = () => {
 const { entries, isLoading, error, isEditMode } = useAppSelector(
  (state) => state.data
 );

 const dispatch = useAppDispatch();

 useEffect(() => {
  dispatch(setCurrentPage('order'));
  dispatch(fetchDataThunk());
 }, []);

 const orders: order[] = entries.orders?.length
  ? entries.orders.map((el) => ({
     ...el,
     orderDate: moment(el.orderDate).format()
    }))
  : [];

 const dataTable = <DataTable columns={orderColumns} rows={orders} />;

 if (entries.orders.length)
  return <>{isEditMode ? <OrderForm /> : dataTable}</>;

 if (isLoading) return <h1>Loading...</h1>;
 if (error) return <h1>{error}</h1>;
};

export default OrderPage;
