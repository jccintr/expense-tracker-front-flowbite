import React, { useEffect, useState, useContext } from 'react';
import api from '../../api/api';
import AuthContext from '../../context/AuthContext';
import { Button, Spinner, TextInput, Select, Label } from 'flowbite-react';
import { LuSearch } from "react-icons/lu";
import EmptyTable from '../../components/EmptyTable';
import TableTransactions from '../../components/tables/TableTransactions';
import TransactionModal from '../../components/modals/TransactionModal';
import DeleteModal from '../../components/modals/DeleteModal';

import TableSearchResults from '../../components/tables/TableSearchResults';

const Search = () => {
  const [searchResults, setSearchResults] = useState([]);
  const { token } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingList, setIsLoadingList] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  
  const [transaction, setTransaction] = useState({ id: 0, description: '', amount: "0", category_id: 0, account_id: 0 });
  const [errorMessage, setErrorMessage] = useState(null);
  
  const [categories, setCategories] = useState([]);
  const [accounts, setAccounts] = useState([]);

  // Search filters
  const [description, setDescription] = useState('');
  const [minDate, setMinDate] = useState('');
  const [maxDate, setMaxDate] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedAccount, setSelectedAccount] = useState('');

  useEffect(() => {
    getCategories();
    getAccounts();
  }, []);

  const getCategories = async () => {
    const response = await api.getCategories(token);
    if (response.ok) {
      const json = await response.json();
      setCategories(json);
    }
  };

  const getAccounts = async () => {
    const response = await api.getAccounts(token);
    if (response.ok) {
      const json = await response.json();
      setAccounts(json);
    }
  };

  const handleSearch = async () => {
    setIsLoadingList(true);
    const params = new URLSearchParams();
    
    if (description.trim()) params.append('description', description.trim());
    if (minDate) params.append('minDate', minDate);
    if (maxDate) params.append('maxDate', maxDate);
    if (selectedCategory) params.append('category', selectedCategory);
    if (selectedAccount) params.append('account', selectedAccount);

    const qs = params.toString();
    const response = await api.search(token, qs);
    
    if (response.ok) {
      const json = await response.json();
      setSearchResults(json);
    } else {
      setSearchResults([]);
    }
    setIsLoadingList(false);
  };

  const onAdd = () => {
    setTransaction({ id: 0, description: '', amount: "0", category_id: 0, account_id: 0 });
    setErrorMessage(null);
    setIsModalOpen(true);
  };

  const onEdit = (trans) => {
    setTransaction({
      id: trans.id,
      description: trans.description,
      category_id: trans.category.id,
      account_id: trans.account.id,
      amount: trans.amount.toString()
    });
    setErrorMessage(null);
    setIsModalEditOpen(true);
  };

  const onDelete = (trans) => {
    setTransaction(trans);
    setIsModalDeleteOpen(true);
  };

  const addTransaction = async () => {
    if (transaction.description.trim().length === 0) {
      setErrorMessage('Informe uma descrição válida.');
      return;
    }
    if (transaction.category_id === 0) {
      setErrorMessage('Selecione uma categoria.');
      return;
    }
    if (transaction.account_id === 0) {
      setErrorMessage('Selecione uma conta.');
      return;
    }
    if (transaction.amount.trim().length === 0 || Number(transaction.amount) <= 0) {
      setErrorMessage('Valor inválido.');
      return;
    }

    setIsLoading(true);
    const response = await api.addTransaction(token, transaction);
    if (response.ok) {
      handleSearch(); // Refresh search results
      setIsModalOpen(false);
    }
    setIsLoading(false);
  };

  const updateTransaction = async () => {
    if (transaction.description.trim().length === 0) {
      setErrorMessage('Informe uma descrição válida.');
      return;
    }
    if (transaction.category_id === 0) {
      setErrorMessage('Selecione uma categoria.');
      return;
    }
    if (transaction.account_id === 0) {
      setErrorMessage('Selecione uma conta.');
      return;
    }
    if (transaction.amount.trim().length === 0 || Number(transaction.amount) <= 0) {
      setErrorMessage('Valor inválido.');
      return;
    }

    setIsLoading(true);
    const response = await api.updateTransaction(token, transaction.id, transaction);
    if (response.ok) {
      handleSearch(); // Refresh search results
      setIsModalEditOpen(false);
    }
    setIsLoading(false);
  };

  const deleteTransaction = async () => {
    setIsLoading(true);
    const response = await api.deleteTransaction(token, transaction.id);
    if (response.ok) {
      handleSearch(); // Refresh search results
      setIsModalDeleteOpen(false);
    } else {
      const result = await response.json();
      alert(result.error || 'Erro ao deletar');
    }
    setIsLoading(false);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
        <h1 className="text-3xl font-semibold text-gray-800">Pesquisa de Transações</h1>
        <Button color="dark" onClick={onAdd}>Nova Transação</Button>
      </div>

      {/* Search Form */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {/* Descrição */}
          <div>
            <Label htmlFor="description" className="mb-2 block">Descrição</Label>
            <TextInput
              id="description"
              type="text"
              placeholder="Ex: Cerveja"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Data Mínima */}
          <div>
            <Label htmlFor="minDate" className="mb-2 block">Data Inicial</Label>
            <TextInput
              id="minDate"
              type="date"
              value={minDate}
              onChange={(e) => setMinDate(e.target.value)}
            />
          </div>

          {/* Data Máxima */}
          <div>
            <Label htmlFor="maxDate" className="mb-2 block">Data Final</Label>
            <TextInput
              id="maxDate"
              type="date"
              value={maxDate}
              onChange={(e) => setMaxDate(e.target.value)}
            />
          </div>

          {/* Categoria */}
          <div>
            <Label htmlFor="category" className="mb-2 block">Categoria</Label>
            <Select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Todas</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </Select>
          </div>

          {/* Conta */}
          <div>
            <Label htmlFor="account" className="mb-2 block">Conta</Label>
            <Select
              id="account"
              value={selectedAccount}
              onChange={(e) => setSelectedAccount(e.target.value)}
            >
              <option value="">Todas</option>
              {accounts.map(acc => (
                <option key={acc.id} value={acc.id}>{acc.name}</option>
              ))}
            </Select>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button onClick={handleSearch} color="dark">
            <LuSearch className="w-5 h-5 mr-2"/>
            <span>Pesquisar</span>
          </Button>
        </div>
      </div>

      {/* Results */}
      {isLoadingList && <Spinner className="absolute top-1/2 left-1/2" color="gray" size="xl" />}
      
      {!isLoadingList && searchResults.length > 0 && (
        <TableSearchResults 
          transactions={searchResults} 
          onEdit={onEdit} 
          onDelete={onDelete} 
        />
      )}
      
      {!isLoadingList && searchResults.length === 0 && (
        <EmptyTable 
          showAddButton={false}
          buttonLabel="Adicionar Transação" 
          message="Nenhuma transação encontrada." 
          message2="Tente ajustar os filtros de pesquisa para obter melhores resultados." 
          onAdd={onAdd} 
        />
      )}

      {/* Modals */}
      <TransactionModal 
        categories={categories} 
        accounts={accounts} 
        errorMessage={errorMessage} 
        isLoading={isLoading} 
        transaction={transaction} 
        setTransaction={setTransaction} 
        isOpen={isModalOpen} 
        setIsOpen={setIsModalOpen} 
        title="Nova Transação"  
        onSave={addTransaction}
      />
      
      <TransactionModal 
        categories={categories} 
        accounts={accounts} 
        errorMessage={errorMessage} 
        isLoading={isLoading} 
        transaction={transaction} 
        setTransaction={setTransaction} 
        isOpen={isModalEditOpen} 
        setIsOpen={setIsModalEditOpen} 
        title="Editando Transação"  
        onSave={updateTransaction}
      />
      
      <DeleteModal 
        isLoading={isLoading} 
        deleteAction={deleteTransaction} 
        isOpen={isModalDeleteOpen} 
        setIsOpen={setIsModalDeleteOpen} 
        title="Deseja deletar esta transação ?" 
        description="Esta operação vai excluir a transação do banco de dados e não poderá ser revertida."
      />
    </div>
  );
};

export default Search;