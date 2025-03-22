import React,{useState,useEffect} from 'react';
import { Button, Label, TextInput, Spinner,Modal } from 'flowbite-react';
import SelectInput from '../inputs/SelectInput';

const TransactionModal = ({isOpen,setIsOpen,title,onSave,transaction,setTransaction,isLoading,errorMessage,categories,accounts}) => {
    const [selectedCategory,setSelectedCategory] = useState(transaction.category_id);
    const [selectedAccount,setSelectedAccount] = useState(transaction.account_id);


  useEffect(()=>{
    setTransaction({...transaction,category_id:selectedCategory})
  },[selectedCategory]);

  useEffect(()=>{
    setTransaction({...transaction,account_id:selectedAccount})
  },[selectedAccount]);

  const change = (v) =>{
console.log(v);
  }

  return (
    <Modal  show={isOpen} size="md" position={'center'}  onClose={() => setIsOpen(false)} >
        <Modal.Header>{title}</Modal.Header>
        <Modal.Body>
            <div>
              <Label value='Descrição' className="font-semibold"/> 
              <TextInput className="mt-1" type='text' value={transaction.description} placeholder='Digite a descrição da transação' id="description" onChange={(e)=>setTransaction({...transaction,description:e.target.value})}/>
            </div>
            <div>
               <Label  value='Categoria' className="font-semibold"/>
               <SelectInput  data={categories} placeholder={'Selecione uma categoria'} onChange={setSelectedCategory} selected={transaction.category_id}/>
            </div>
            <div>
               <Label value='Conta' className="font-semibold"/>
               <SelectInput  data={accounts} placeholder={'Selecione uma conta'} onChange={setSelectedAccount} selected={transaction.account_id}/>
            </div>
            <div>
              <Label value='Valor' className="font-semibold"/> 
              <TextInput className="mt-1" type='text' value={transaction.amount} placeholder='Digite o valor da transação' id="amount" onChange={(e)=>setTransaction({...transaction,amount:e.target.value})}/>
            </div>
            {errorMessage&&<div className='flex'><span className='mt-4 text-sm text-red-600'>{errorMessage}</span></div>}
        </Modal.Body>
        <Modal.Footer>
            <Button color='dark' disabled={isLoading} onClick={()=>onSave()}>{isLoading ? <Spinner size='sm'/> : 'Salvar'}</Button>
            <Button color="gray" disabled={isLoading} onClick={() => setIsOpen(false)}>Cancelar</Button>
        </Modal.Footer>
    </Modal>
  )
}

export default TransactionModal