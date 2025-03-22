import { LuPencil } from "react-icons/lu";
import { FaRegTrashAlt } from "react-icons/fa";
import { Table,Button } from "flowbite-react";
import { formataHora } from "../../util/util";

const TableTransactions = ({transactions,onEdit,onDelete}) => {
  return (
    <Table hoverable >
        <Table.Head>
          <Table.HeadCell>Descrição</Table.HeadCell>
          <Table.HeadCell>Hora</Table.HeadCell>
          <Table.HeadCell>Categoria</Table.HeadCell>
          <Table.HeadCell>Conta</Table.HeadCell>
          <Table.HeadCell className='text-right'>Valor</Table.HeadCell>
          <Table.HeadCell className='flex justify-end'>Ações</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
        {transactions.map((transaction) => (
             <Table.Row className="bg-white">
                  <Table.Cell className='text-slate-950'>{transaction.description}</Table.Cell>
                  <Table.Cell className='text-slate-950'>{formataHora(transaction.createdAt)}</Table.Cell>
                  <Table.Cell className='text-slate-950'>{transaction.category.name}</Table.Cell>
                  <Table.Cell className='text-slate-950'>{transaction.account.name}</Table.Cell>
                  <Table.Cell className='text-right text-slate-950'>{transaction.amount.toFixed(2)}</Table.Cell>
                  <Table.Cell className='flex justify-end'>
                          <div className='flex flex-row gap-2'>
                            <Button size="xs"  color="dark" onClick={()=>onEdit(transaction)}><LuPencil/></Button>
                            <Button size="xs"  color="failure" onClick={()=>onDelete(transaction)}><FaRegTrashAlt/></Button>
                          </div>
                  </Table.Cell>
             </Table.Row>
           ))}
        </Table.Body>
    </Table>
  )
}

export default TableTransactions