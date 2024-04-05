import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import {
 deleteDataThunk,
 fetchDataThunk,
 setIsModal
} from '../state/dataSlice';
import { indexEntriesFromDB } from '../state/functions';

const style = {
 position: 'absolute' as 'absolute',
 top: '50%',
 left: '50%',
 transform: 'translate(-50%, -50%)',
 width: 400,
 bgcolor: 'background.paper',
 border: '2px solid #000',
 boxShadow: 24,
 p: 4
};

export default function BasicModal() {
 const data = useAppSelector((state) => state.data);
 const dispatch = useAppDispatch();

 const closeModal = () => dispatch(setIsModal(false));

 const handleProceed = () => {
  closeModal();
  dispatch(deleteDataThunk());
  dispatch(fetchDataThunk());
  setTimeout(() => window.location.reload(), 500);
 };

 return (
  <div>
   <Modal
    open={data.isModal}
    onClose={() => dispatch(setIsModal(false))}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
   >
    <Box sx={style}>
     <Typography
      sx={{ color: 'red' }}
      id="modal-modal-title"
      variant="h6"
      component="h2"
     >
      DELETE MODE
     </Typography>
     <Typography id="modal-modal-description" sx={{ mt: 2 }}>
      {indexEntriesFromDB(data)}
     </Typography>
     <Button sx={{ color: 'green', marginTop: '1cm' }} onClick={handleProceed}>
      proceed
     </Button>
     <Button sx={{ color: 'black', marginTop: '1cm' }} onClick={closeModal}>
      cancel
     </Button>
    </Box>
   </Modal>
  </div>
 );
}
