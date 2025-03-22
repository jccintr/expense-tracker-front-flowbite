import React,{useContext} from 'react';
import AuthContext from '../context/AuthContext';
import { Outlet,Navigate } from 'react-router-dom';

const PrivateRoute = () => {
    const {loggedUser} = useContext(AuthContext);

  return loggedUser ? <Outlet/> : <Navigate to='/login'/>;

}

export default PrivateRoute;