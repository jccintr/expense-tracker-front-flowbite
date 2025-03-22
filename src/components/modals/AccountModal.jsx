import { Button, Label, TextInput, Spinner,Modal } from 'flowbite-react';

const AccountModal = ({isOpen,setIsOpen,title,onSave,account,setAccount,isLoading,errorMessage}) => {
  return (
    <Modal  show={isOpen} size="md" position={'center'}  onClose={() => setIsOpen(false)} >

        <Modal.Header>{title}</Modal.Header>

        <Modal.Body>
          
           <div>
              <Label value='Nome' className="font-semibold"/> 
              <TextInput className="mt-1" type='text' value={account.name} placeholder='Digite o nome da conta' id="name" onChange={(e)=>setAccount({...account,name:e.target.value})}/>
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

export default AccountModal