import { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { useAppDispatch } from '../../state/hooks';
import { item } from '../types';
import { editAddThunk } from '../../state/dataSlice';

const ItemForm = () => {
 const [input, setInput] = useState({
  id: '',
  name: '',
  price: ''
 });

 const dispatch = useAppDispatch();

 const handleSubmit = () => {
  const item: item = { ...input, id: parseInt(input.id) };
  dispatch(editAddThunk(item));
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
     name="name"
     label="Name"
     variant="outlined"
     value={input.name}
     onChange={(e) => setInput({ ...input, name: e.target.value })}
    />
   </div>
   <div className="form-field">
    <TextField
     name="price"
     label="Price"
     variant="outlined"
     value={input.price}
     onChange={(e) => setInput({ ...input, price: e.target.value })}
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

export default ItemForm;
