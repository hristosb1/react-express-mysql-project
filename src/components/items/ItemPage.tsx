import { useEffect } from 'react';
import { fetchDataThunk, setCurrentPage } from '../../state/dataSlice';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import DataTable from '../DataTable';
import { itemColumns } from '../tableSetup';
import ItemForm from './ItemForm';

const ItemPage = () => {
 const { entries, isLoading, error, isEditMode } = useAppSelector(
  (state) => state.data
 );

 const dispatch = useAppDispatch();

 useEffect(() => {
  dispatch(setCurrentPage('item'));
  dispatch(fetchDataThunk());
 }, []);

 const dataTable = <DataTable columns={itemColumns} rows={entries.items} />;

 if (entries.items.length) return <>{isEditMode ? <ItemForm /> : dataTable}</>;

 if (isLoading) return <h1>Loading...</h1>;
 if (error) return <h1>{error}</h1>;
};

export default ItemPage;
