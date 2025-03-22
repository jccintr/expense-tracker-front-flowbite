import { Select } from "flowbite-react";

const SelectInput = ({placeholder,data,onChange,selected}) => {
  return (
    <div className="mt-1">
    <Select value={selected}  placeholder={placeholder} onChange={(e)=>onChange(e.target.value)} >
         <option key={0} value={0} selected={selected==0?true:false}>{placeholder}</option>
         {data.map((item)=><option key={item.id} value={item.id} selected={selected==item.id?true:false}>{item.name}</option>)}
    </Select>
    </div>
  )
}

export default SelectInput