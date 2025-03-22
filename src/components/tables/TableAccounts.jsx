import { LuPencil } from "react-icons/lu";
import { FaRegTrashAlt } from "react-icons/fa";
import { Table,Button } from "flowbite-react";

const TableAccounts = ({accounts,onEdit,onDelete}) => {
  return (
    <Table hoverable >
        <Table.Head>
          <Table.HeadCell>Nome</Table.HeadCell>
          <Table.HeadCell className='flex justify-end'>Ações</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
        {accounts.map((account) => (
             <Table.Row className="bg-white">
                  <Table.Cell className='text-slate-950'>{account.name}</Table.Cell>
                  <Table.Cell className='flex justify-end'>
                          <div className='flex flex-row gap-2'>
                            <Button size="xs"  color="dark" onClick={()=>onEdit(account)}><LuPencil/></Button>
                            <Button size="xs"  color="failure" onClick={()=>onDelete(account)}><FaRegTrashAlt/></Button>
                          </div>
                  </Table.Cell>
             </Table.Row>
           ))}
        </Table.Body>
    </Table>
  )
}

export default TableAccounts