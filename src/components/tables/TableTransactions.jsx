import { LuPencil } from "react-icons/lu";
import { FaRegTrashAlt } from "react-icons/fa";
import { Table, Button } from "flowbite-react";
import { formataHora } from "../../util/util";

const TableTransactions = ({ transactions, onEdit, onDelete, showActions = true }) => {

  // Calcula o total das transações
  const total = transactions.reduce((acc, transaction) => {
    return acc + transaction.amount;
  }, 0);

  return (
    <>
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Descrição</Table.HeadCell>
          <Table.HeadCell>Hora</Table.HeadCell>
          <Table.HeadCell>Categoria</Table.HeadCell>
          <Table.HeadCell>Conta</Table.HeadCell>
          <Table.HeadCell className='text-right'>Valor</Table.HeadCell>
          {showActions && <Table.HeadCell className='flex justify-end'>Ações</Table.HeadCell>}
        </Table.Head>
        <Table.Body className="divide-y">
          {transactions.map((transaction) => (
            <Table.Row className="bg-white" key={transaction.id}>
              <Table.Cell className='text-slate-950'>{transaction.description}</Table.Cell>
              <Table.Cell className='text-slate-950'>{formataHora(transaction.createdAt)}</Table.Cell>
              <Table.Cell className='text-slate-950'>{transaction.category.name}</Table.Cell>
              <Table.Cell className='text-slate-950'>{transaction.account.name}</Table.Cell>
              <Table.Cell className='text-right text-slate-950'>
                {transaction.amount.toFixed(2).replace('.', ',')}
              </Table.Cell>
              {showActions && <Table.Cell className='flex justify-end'>
                <div className='flex flex-row gap-2'>
                  <Button size="xs" color="dark" onClick={() => onEdit(transaction)}>
                    <LuPencil />
                  </Button>
                  <Button size="xs" color="failure" onClick={() => onDelete(transaction)}>
                    <FaRegTrashAlt />
                  </Button>
                </div>
              </Table.Cell>}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      {/* Totalização */}
      <div className="mt-4 flex justify-end">
        <div className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1 flex items-center gap-3">
          <span className="text-slate-600 font-medium">Total:</span>
          <span className="text-xl font-bold text-slate-700">
            R$ {total.toFixed(2).replace('.', ',')}
          </span>
        </div>
      </div>
    </>
  );
};

export default TableTransactions;