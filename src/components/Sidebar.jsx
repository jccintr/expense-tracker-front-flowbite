import React,{useEffect, useState,useContext} from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sidebar,Label } from 'flowbite-react';
import AuthContext from '../context/AuthContext';
import { BsBarChartFill } from "react-icons/bs";
import { RiMoneyDollarCircleLine } from "react-icons/ri"
import { LuWallet,LuTags,LuLogOut  } from "react-icons/lu";
import { sideBarCustomTheme } from '../theme/SideBarTheme';

const SideBar = () => {

    const location = useLocation();
    const [page,setPage] = useState('');
    const {setLoggedUser,loggedUser} = useContext(AuthContext);

    useEffect(()=>{
        const urlParams = new URLSearchParams(location.search);
        const pageFromUrl = urlParams.get('page');
       
        if(pageFromUrl){
          setPage(pageFromUrl);
        }
        
      },[location.search]);
  

      const onLogout = async () => {

        setLoggedUser(null);
        navigate('/login');
      
      }




  return (
    <Sidebar className='w-full md:w-56' theme={sideBarCustomTheme}>
        <div className='flex flex-col mb-4'>
            <img src='logo350.png' alt='logo' className='w-6/12 m-auto mb-2' />
            <Label className="text-center text-xl font-semibold mb-2">Expense Tracker</Label>
            <Label className="text-center text-sm font-semibold">{loggedUser.name}</Label>
        </div>
    <Sidebar.Items>
        <Sidebar.ItemGroup>

             <Link to='/?page=transactions'>
                    <Sidebar.Item  active={page === 'transactions' || !page} icon={RiMoneyDollarCircleLine} as='div'>Transações</Sidebar.Item>
              </Link>
              <Link to='/?page=dashboard'>
                    <Sidebar.Item  active={page === 'dashboard' || !page} icon={BsBarChartFill} as='div'>Dashboard</Sidebar.Item>
              </Link>
              <Link to='/?page=categories'>
                    <Sidebar.Item  active={page === 'categories' || !page} icon={LuTags} as='div'>Categorias</Sidebar.Item>
              </Link>
              <Link to='/?page=accounts'>
                    <Sidebar.Item  active={page === 'accounts' || !page} icon={LuWallet} as='div'>Contas</Sidebar.Item>
              </Link>
              <Sidebar.Item  onClick={onLogout} icon={LuLogOut} as='div'>Sair</Sidebar.Item>
             
             
        </Sidebar.ItemGroup>
    </Sidebar.Items>
</Sidebar>
  )
}

export default SideBar