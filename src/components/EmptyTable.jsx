import { Button,Label } from 'flowbite-react';

const EmptyTable = ({message,message2,buttonLabel,onAdd}) => {
  return (
    <div className='flex flex-col w-full items-center justify-center my-auto'>
        <img src='empty.png' className='h-[300px] mt-10'/>
        <Label className='my-4 text-xl text-gray-500'>{message}</Label>
        <Label className='my-4 text-base text-gray-500'>{message2}</Label>
        <Button color="light" onClick={onAdd}>{buttonLabel}</Button>
    </div>
  )
}

export default EmptyTable