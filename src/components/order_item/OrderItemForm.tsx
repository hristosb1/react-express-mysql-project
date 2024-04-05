import { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { useAppDispatch } from '../../state/hooks';
import { order_item } from '../types';
import { editAddThunk } from '../../state/dataSlice';

const OrderItemForm = () => {
 const [input, setInput] = useState({
  id: '',
  order_id: '',
  item_id: ''
 });

 const dispatch = useAppDispatch();

 const handleSubmit = () => {
  const order_item: order_item = {
   id: parseInt(input.id),
   order_id: parseInt(input.order_id),
   item_id: parseInt(input.item_id)
  };
  dispatch(editAddThunk(order_item));
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
     name="Order ID"
     label="Order ID"
     variant="outlined"
     value={input.order_id}
     onChange={(e) => setInput({ ...input, order_id: e.target.value })}
    />
   </div>
   <div className="form-field">
    <TextField
     name="item_id"
     label="Item ID"
     variant="outlined"
     value={input.item_id}
     onChange={(e) => setInput({ ...input, item_id: e.target.value })}
    />
   </div>
   <div className="form-field">
    <Button variant="contained" color="primary" type="submit">
     SET
    </Button>
   </div>
  </form>
 );
};

export default OrderItemForm;
