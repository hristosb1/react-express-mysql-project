import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import DataTable from '../DataTable';
import { customerColumns } from '../tableSetup';
import CustomerForm from './CustomerForm';
import { fetchDataThunk, setCurrentPage } from '../../state/dataSlice';

const CustomerPage = () => {
 const { entries, isLoading, error, isEditMode } = useAppSelector(
  (state) => state.data
 );

 const dispatch = useAppDispatch();

 useEffect(() => {
  dispatch(setCurrentPage('customer'));
  dispatch(fetchDataThunk());
 }, []);

 const dataTable = (
  <DataTable columns={customerColumns} rows={entries.customers} />
 );

 if (entries.customers.length)
  return <>{isEditMode ? <CustomerForm /> : dataTable}</>;

 if (isLoading) return <h1>Loading...</h1>;
 if (error) return <h1>{error}</h1>;
};

export default CustomerPage;
