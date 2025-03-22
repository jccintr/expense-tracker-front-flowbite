import { Button, Label, TextInput, Spinner,Modal } from 'flowbite-react';

const CategoryModal = ({isOpen,setIsOpen,title,onSave,category,setCategory,isLoading,errorMessage}) => {
  return (
    <Modal  show={isOpen} size="md" position={'center'}  onClose={() => setIsOpen(false)} >

        <Modal.Header>{title}</Modal.Header>

        <Modal.Body>
          
           <div>
              <Label value='Nome' className="font-semibold"/> 
              <TextInput className="mt-1" type='text' value={category.name} placeholder='Digite o nome da categoria' id="name" onChange={(e)=>setCategory({...category,name:e.target.value})}/>
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

export default CategoryModal