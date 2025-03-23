import { Button,Spinner } from 'flowbite-react';
import {useState,useEffect,useContext} from 'react'
import api from '../../api/api';
import AuthContext from '../../context/AuthContext';
import TableAccounts from '../../components/tables/TableAccounts';
import AccountModal from '../../components/modals/AccountModal';
import DeleteModal from '../../components/modals/DeleteModal';


const Accounts = () => {
  const [accounts,setAccounts] = useState([]);
  const {token} = useContext(AuthContext);
  const [isLoadingList,setIsLoadingList] = useState(false);
  const [isLoading,setIsLoading] = useState(false);
  const [isModalOpen,setIsModalOpen] = useState(false);
  const [isModalDeleteOpen,setIsModalDeleteOpen] = useState(false);
  const [isModalEditOpen,setIsModalEditOpen] = useState(false);
  const [account,setAccount] = useState({id:0,name:''});
  const [errorMessage,setErrorMessage] = useState(null);


 useEffect(()=>{

    getAccounts();

},[]);

const getAccounts = async () => {
  setIsLoadingList(true)
  const response = await api.getAccounts(token);
  if(response.ok){
     const json = await response.json();
     setAccounts(json);
  }       
  setIsLoadingList(false)
}

const onAdd = () => {
  setAccount({id:0,name:''});
  setErrorMessage(null);
  setIsModalOpen(true);
}

const onEdit = (account) => {
  setAccount(account);
  setErrorMessage(null);
  setIsModalEditOpen(true);
}

const onDelete = (account) => {
setAccount(account);
setIsModalDeleteOpen(true);
}

const addAccount = async  () => {
  
  if(account.name.trim().length===0){
    setErrorMessage('Nome da conta inválido.');
    return;
   }
    
   setIsLoading(true);
    const response = await api.addAccount(token,account.name);
    if(response.ok){
       getAccounts();
       setIsLoading(false);
       setIsModalOpen(false);
    }
    setIsLoading(false);
}

const updateAccount = async  () => {

  if(account.name.trim().length===0){
    setErrorMessage('Nome da conta inválido.');
    return;
   }

   setIsLoading(true);
    const response = await api.updateAccount(token,account.id,account.name);
    if(response.ok){
       getAccounts();
       setIsLoading(false);
       setIsModalEditOpen(false);
    }
    setIsLoading(false);
}

const deleteAccount = async () => {
 setIsLoading(true);
  const response = await api.deleteAccount(token,account.id);
  if(response.ok){
    getAccounts();
    setIsLoading(false);
   setIsModalDeleteOpen(false);
    return;
  }
  setIsModalDeleteOpen(false);
  const result = await response.json();
  const error = result.error;
  setIsLoading(false);
  alert(error);
  return;
}

  return (
    <div className='w-full p-5 mx-auto'>
        <div className='flex w-full flex-row justify-between mb-4'>
          <h1 className='text-3xl font-semibold'>Contas</h1>
          <Button color='dark' onClick={()=>onAdd()}>Nova Conta</Button>
        </div>
        {isLoadingList?<Spinner className='absolute top-1/2 left-1/2' color='gray' size="xl" />:<TableAccounts accounts={accounts} onEdit={onEdit} onDelete={onDelete}/>}
        <AccountModal errorMessage={errorMessage} isLoading={isLoading} account={account} setAccount={setAccount} isOpen={isModalOpen} setIsOpen={setIsModalOpen} title={'Nova Conta'} onSave={addAccount}/>
        <AccountModal errorMessage={errorMessage} isLoading={isLoading} account={account} setAccount={setAccount} isOpen={isModalEditOpen} setIsOpen={setIsModalEditOpen} title={'Editando Conta'} onSave={updateAccount}/>
        <DeleteModal isLoading={isLoading} deleteAction={deleteAccount} isOpen={isModalDeleteOpen} setIsOpen={setIsModalDeleteOpen} title="Deseja deletar esta conta ?" description={'Esta operação vai excluir a conta do banco de dados e não poderá ser revertida.'}/>
    </div>
  )
}

export default Accounts