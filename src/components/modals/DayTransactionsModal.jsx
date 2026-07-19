import { useState, useEffect } from 'react';
import { Modal, Button, Spinner } from 'flowbite-react';
import { LuX } from "react-icons/lu";
import api from '../../api/api';

import TableTransactions from '../tables/TableTransactions'

const DayTransactionsModal = ({ 
  isOpen, 
  onClose, 
  selectedDate, 
  token 
}) => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen && selectedDate && token) {
      fetchTransactions(selectedDate);
    }
  }, [isOpen, selectedDate, token]);

  const fetchTransactions = async (date) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await api.getTransactions(date, token);
      if (response.ok) {
        const data = await response.json();
        setTransactions(data); // assumindo que retorna um array direto
      } else {
        setError('Erro ao carregar transações');
      }
    } catch (err) {
      setError('Erro de conexão');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (transaction) => {
    // Implemente a lógica de edição (pode abrir outro modal)
    console.log('Editar transação:', transaction);
    // Exemplo: onEdit(transaction);
  };

  const handleDelete = async (transaction) => {
    if (!window.confirm('Deseja realmente excluir esta transação?')) return;

    try {
      const response = await api.deleteTransaction(token, transaction.id);
      if (response.ok) {
        // Recarrega as transações
        fetchTransactions(selectedDate);
      }
    } catch (err) {
      console.error('Erro ao deletar', err);
    }
  };

  if (!isOpen) return null;

  return (
    <Modal show={isOpen} onClose={onClose} size="2xl">
      <Modal.Header>
        Transações do dia {new Date(selectedDate).toLocaleDateString('pt-BR')}
      </Modal.Header>
      <Modal.Body>
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Spinner size="xl" />
          </div>
        ) : error ? (
          <p className="text-red-500 text-center py-8">{error}</p>
        ) : transactions.length === 0 ? (
          <p className="text-center py-12 text-gray-500">
            Nenhuma transação encontrada neste dia.
          </p>
        ) : (
          <TableTransactions 
            transactions={transactions} 
            onEdit={handleEdit} 
            onDelete={handleDelete} 
            showActions={false}
          />
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button color="gray" onClick={onClose}>
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DayTransactionsModal;