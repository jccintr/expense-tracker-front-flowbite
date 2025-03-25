import React,{useEffect, useState,useContext} from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sidebar,Label } from 'flowbite-react';
import AuthContext from '../context/AuthContext';
import { BsBarChartFill } from "react-icons/bs";
import { RiMoneyDollarCircleLine } from "react-icons/ri"
import { LuWallet,LuTags,LuLogOut  } from "react-icons/lu";
//import { sideBarCustomTheme } from '../theme/SideBarTheme.js';

const sideBarCustomTheme = {
  "root": {
    "base": "h-full",
    "collapsed": {
      "on": "w-16",
      "off": "w-64"
    },
    "inner": "h-full overflow-y-auto overflow-x-hidden rounded bg-gray-100 px-3 py-4 dark:bg-gray-800"
  },
  "collapse": {
    "button": "group flex w-full items-center rounded-lg p-2 text-base font-normal text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700",
    "icon": {
      "base": "h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white",
      "open": {
        "off": "",
        "on": "text-gray-900"
      }
    },
    "label": {
      "base": "ml-3 flex-1 whitespace-nowrap text-left",
      "icon": {
        "base": "h-6 w-6 transition delay-0 ease-in-out",
        "open": {
          "on": "rotate-180",
          "off": ""
        }
      }
    },
    "list": "space-y-2 py-2"
  },
  "cta": {
    "base": "mt-6 rounded-lg bg-gray-100 p-4 dark:bg-gray-700",
    "color": {
      "blue": "bg-cyan-50 dark:bg-cyan-900",
      "dark": "bg-dark-50 dark:bg-dark-900",
      "failure": "bg-red-50 dark:bg-red-900",
      "gray": "bg-alternative-50 dark:bg-alternative-900",
      "green": "bg-green-50 dark:bg-green-900",
      "light": "bg-light-50 dark:bg-light-900",
      "red": "bg-red-50 dark:bg-red-900",
      "purple": "bg-purple-50 dark:bg-purple-900",
      "success": "bg-green-50 dark:bg-green-900",
      "yellow": "bg-yellow-50 dark:bg-yellow-900",
      "warning": "bg-yellow-50 dark:bg-yellow-900"
    }
  },
  "item": {
    "base": "flex items-center justify-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-300 dark:text-white dark:hover:bg-gray-700",
    "active": "bg-gray-200 dark:bg-gray-700",
    "collapsed": {
      "insideCollapse": "group w-full pl-8 transition duration-75",
      "noIcon": "font-bold"
    },
    "content": {
      "base": "flex-1 whitespace-nowrap px-3"
    },
    "icon": {
      "base": "h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white",
      "active": "text-gray-700 dark:text-gray-100"
    },
    "label": "",
    "listItem": ""
  },
  "items": {
    "base": ""
  },
  "itemGroup": {
    "base": "mt-4 space-y-2 border-t border-gray-200 pt-4 first:mt-0 first:border-t-0 first:pt-0 dark:border-gray-700"
  },
  "logo": {
    "base": "mb-5 flex items-center pl-2.5",
    "collapsed": {
      "on": "hidden",
      "off": "self-center whitespace-nowrap text-xl font-semibold dark:text-white"
    },
    "img": "mr-3 h-6 sm:h-7"
  }
}

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