import React,{useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import Transactions from './home/Transactions';
import Accounts from './home/Accounts';
import Categories from './home/Categories';
import Dashboard from './home/Dashboard';
import SideBar from '../components/Sidebar';



 const Home = () => {
  const location = useLocation();
  const [page, setPage] = useState('');


  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const pageFromUrl = urlParams.get('page');
    if (pageFromUrl) {
      setPage(pageFromUrl);
    }
  }, [location.search]);


  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className=''>
        <SideBar/>
      </div>
       {page === 'dashboard' && <Dashboard />}
       {page === 'transactions' && <Transactions />}
       {page === 'accounts' && <Accounts/>}
       {page === 'categories' && <Categories />}
    </div>
  )
}

export default Home;
