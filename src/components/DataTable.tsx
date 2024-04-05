import { DataGrid, GridRowId } from '@mui/x-data-grid';
import { columns } from './tableSetup';
import { row } from './types';
import BasicModal from './BasicModal';
import { useAppDispatch } from '../state/hooks';
import { setSelections } from '../state/dataSlice';

type dataTableProps = {
 columns: columns;
 rows: row[];
};

export default function DataTable(props: dataTableProps) {
 const { rows, columns } = props;

 const dispatch = useAppDispatch();

 const handleSelectionChange = (sel: GridRowId[]) => {
  const numbers = sel.map((sel) => parseInt(sel.toString()));
  dispatch(setSelections(numbers));
 };

 return (
  <div style={{ height: 400, width: '100%' }}>
   <DataGrid
    rows={rows?.length ? rows : []}
    columns={columns}
    initialState={{
     pagination: {
      paginationModel: { page: 0, pageSize: 5 }
     }
    }}
    pageSizeOptions={[5, 10]}
    checkboxSelection
    onRowSelectionModelChange={handleSelectionChange}
   />
   <BasicModal />
  </div>
 );
}
