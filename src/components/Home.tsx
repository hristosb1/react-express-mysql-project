import { useEffect } from 'react';
import { useAppDispatch } from '../state/hooks';
import { fetchDataThunk } from '../state/dataSlice';

const Home = () => {
 const dispatch = useAppDispatch();

 useEffect(() => {
  dispatch(fetchDataThunk());
 }, []);

 return (
  <>
   <div className="image-container">
    <img src="src\components\images\react.svg"></img>
    <img src="src\components\images\vite.svg"></img>
    <img src="src\components\images\mysql.svg"></img>
   </div>
  </>
 );
};

export default Home;
