import { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { useAppDispatch } from '../../state/hooks';
import { customer } from '../types';
import { editAddThunk } from '../../state/dataSlice';

const CustomerForm = () => {
 const [input, setInput] = useState({
  id: '',
  phone: '',
  email: ''
 });

 const dispatch = useAppDispatch();

 const handleSubmit = () => {
  const customer: customer = { ...input, id: parseInt(input.id) };
  dispatch(editAddThunk(customer));
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
     name="phone"
     label="Phone"
     variant="outlined"
     value={input.phone}
     onChange={(e) => setInput({ ...input, phone: e.target.value })}
    />
   </div>
   <div className="form-field">
    <TextField
     name="email"
     label="Email"
     variant="outlined"
     value={input.email}
     onChange={(e) => setInput({ ...input, email: e.target.value })}
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

export default CustomerForm;
