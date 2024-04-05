import { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { useAppDispatch } from '../../state/hooks';
import moment from 'moment';
import { editAddThunk } from '../../state/dataSlice';
import { order } from '../types';

const OrderForm = () => {
 const [input, setInput] = useState({
  id: '',
  orderDate: '',
  customer_id: ''
 });

 const dispatch = useAppDispatch();

 const handleSubmit = () => {
  const order: order = {
   ...input,
   id: parseInt(input.id),
   customer_id: parseInt(input.customer_id)
  };
  dispatch(editAddThunk(order));
 };

 return (
  <form className="form" onSubmit={handleSubmit}>
   <div className="form-field">
    <TextField
     name="id"
     label="ID"
     variant="outlined"
     value={input.id}
     onChange={(e) => setInput({ ...input, id: e.target.value })}
    />
   </div>
   <div className="form-field">
    <TextField
     name="order date"
     label="Order Date"
     variant="outlined"
     value={input.orderDate}
     onChange={(e) => setInput({ ...input, orderDate: e.target.value })}
    />
   </div>
   <div className="form-field">
    <TextField
     name="customer_id"
     label="Customer ID"
     variant="outlined"
     value={input.customer_id}
     onChange={(e) => setInput({ ...input, customer_id: e.target.value })}
    />
   </div>
   <div className="form-field">
    <Button variant="contained" color="primary" type="submit">
     SET
    </Button>
    <Button
     variant="contained"
     color="primary"
     type="button"
     onClick={() => setInput({ ...input, orderDate: moment().format() })}
     sx={{ margin: '2px' }}
    >
     NOW
    </Button>
   </div>
  </form>
 );
};

export default OrderForm;
