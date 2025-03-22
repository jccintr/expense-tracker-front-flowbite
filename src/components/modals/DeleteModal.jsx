import React from 'react'
import { Button, Label,Spinner,Modal } from 'flowbite-react';

const DeleteModal = ({isOpen,setIsOpen,title,description,deleteAction,isLoading}) => {
  return (
     <Modal  show={isOpen} size="md" position={'center'}  onClose={() => setIsOpen(false)} >
            <Modal.Body>
               <div className='flex flex-col'>
                 <Label className='text-slate-950 text-lg font-semibold mb-2'>{title}</Label>
                 <Label className='text-gray-500'>{description}</Label>
               </div>
            </Modal.Body>
    
            <Modal.Footer>
                <Button color='failure' disabled={isLoading} onClick={()=>deleteAction()}>{isLoading ? <Spinner size='sm'/> : 'DELETAR'}</Button>
                <Button color="gray" disabled={isLoading} onClick={() => setIsOpen(false)}>Cancelar</Button>
            </Modal.Footer>
    
          </Modal>
  )
}

export default DeleteModal