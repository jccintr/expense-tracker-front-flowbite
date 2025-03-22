import { Button } from 'flowbite-react';
import {useState,useEffect,useContext} from 'react'
import api from '../../api/api';
import AuthContext from '../../context/AuthContext';
import TableCategories from '../../components/tables/TableCategories';
import CategoryModal from '../../components/modals/CategoryModal';
import DeleteModal from '../../components/modals/DeleteModal';

const Categories = () => {
  const [categories,setCategories] = useState([]);
  const {token} = useContext(AuthContext);
  const [isLoading,setIsLoading] = useState(false);
  const [isLoadingList,setIsLoadingList] = useState(false);
  const [isModalOpen,setIsModalOpen] = useState(false);
  const [isModalDeleteOpen,setIsModalDeleteOpen] = useState(false);
  const [isModalEditOpen,setIsModalEditOpen] = useState(false);
  const [category,setCategory] = useState({id:0,name:''});
  const [errorMessage,setErrorMessage] = useState(null);

  useEffect(()=>{
    getCategories();
  },[]);

const getCategories = async () => {
  setIsLoadingList(true);
  const response = await api.getCategories(token);
  if(response.ok){
     const json = await response.json();
     setCategories(json);
    
  }       
  setIsLoadingList(false);
}

const onAdd = () => {
    setCategory({id:0,name:''});
    setErrorMessage(null);
    setIsModalOpen(true);
}

const onEdit = (category) => {
    setCategory(category);
    setErrorMessage(null);
    setIsModalEditOpen(true);
}

const onDelete = (category) => {
  setCategory(category);
  setIsModalDeleteOpen(true);
}

const addCategory = async  () => {
  
  if(category.name.trim().length===0){
    setErrorMessage('Nome da categoria inválido.');
    return;
   }
    
   setIsLoading(true);
    const response = await api.addCategory(token,category.name);
    if(response.ok){
       getCategories();
       setIsLoading(false);
       setIsModalOpen(false);
    }
    setIsLoading(false);
}

const updateCategory = async  () => {

  if(category.name.trim().length===0){
    setErrorMessage('Nome da categoria inválido.');
    return;
   }

   setIsLoading(true);
    const response = await api.updateCategory(token,category.id,category.name);
    if(response.ok){
       getCategories();
       setIsLoading(false);
       setIsModalEditOpen(false);
    }
    setIsLoading(false);
}

const deleteCategory = async () => {
 setIsLoading(true);
  const response = await api.deleteCategory(token,category.id);
  if(response.ok){
    getCategories();
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
    <div className='w-full p-5  mx-auto'>
    <div className='flex w-full flex-row justify-between mb-4'>
      <h1 className='text-3xl font-semibold'>Categorias</h1>
      <Button color='dark' onClick={()=>onAdd()}>Nova Categoria</Button>
    </div>
    <TableCategories categories={categories} onEdit={onEdit} onDelete={onDelete}/>
    <CategoryModal errorMessage={errorMessage} isLoading={isLoading} category={category} setCategory={setCategory} isOpen={isModalOpen} setIsOpen={setIsModalOpen} title={'Nova Categoria'} onSave={addCategory}/>
    <CategoryModal errorMessage={errorMessage} isLoading={isLoading} category={category} setCategory={setCategory} isOpen={isModalEditOpen} setIsOpen={setIsModalEditOpen} title={'Editando Categoria'} onSave={updateCategory}/>
    <DeleteModal isLoading={isLoading} deleteAction={deleteCategory} isOpen={isModalDeleteOpen} setIsOpen={setIsModalDeleteOpen} title="Deseja deletar esta categoria ?" description={'Esta operação vai excluir a categoria do banco de dados e não poderá ser revertida.'}/>
</div>
  )
}

export default Categories