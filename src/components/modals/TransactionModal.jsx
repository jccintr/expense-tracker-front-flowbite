import React, { useState, useEffect } from 'react';
import { Button, Label, TextInput, Spinner, Modal } from 'flowbite-react';
import SelectInput from '../inputs/SelectInput';

const TransactionModal = ({
  isOpen,
  setIsOpen,
  title,
  onSave,
  transaction,
  setTransaction,
  isLoading,
  errorMessage,
  categories,
  accounts
}) => {
  const [selectedCategory, setSelectedCategory] = useState(transaction.category_id || 0);
  const [selectedAccount, setSelectedAccount] = useState(transaction.account_id || 0);

  // Sincroniza os selects quando o transaction mudar (importante para edição)
  useEffect(() => {
    setSelectedCategory(transaction.category_id || 0);
    setSelectedAccount(transaction.account_id || 0);
  }, [transaction.category_id, transaction.account_id]);

  // Atualiza o transaction pai quando o usuário seleciona algo
  useEffect(() => {
    setTransaction(prev => ({ ...prev, category_id: selectedCategory }));
  }, [selectedCategory, setTransaction]);

  useEffect(() => {
    setTransaction(prev => ({ ...prev, account_id: selectedAccount }));
  }, [selectedAccount, setTransaction]);

  const handleSave = () => {
    onSave();
  };

  return (
    <Modal show={isOpen} size="md" position="center" onClose={() => setIsOpen(false)}>
      <Modal.Header>{title}</Modal.Header>
      <Modal.Body>
        <div className="space-y-4">
          <div>
            <Label value="Descrição" className="font-semibold" />
            <TextInput
              className="mt-1"
              type="text"
              value={transaction.description}
              placeholder="Digite a descrição da transação"
              onChange={(e) => setTransaction({ ...transaction, description: e.target.value })}
            />
          </div>

          <div>
            <Label value="Categoria" className="font-semibold" />
            <SelectInput
              data={categories}
              placeholder="Selecione uma categoria"
              onChange={setSelectedCategory}
              selected={selectedCategory}
            />
          </div>

          <div>
            <Label value="Conta" className="font-semibold" />
            <SelectInput
              data={accounts}
              placeholder="Selecione uma conta"
              onChange={setSelectedAccount}
              selected={selectedAccount}
            />
          </div>

          <div>
            <Label value="Valor" className="font-semibold" />
            <TextInput
              className="mt-1"
              type="text"
              value={transaction.amount}
              placeholder="Digite o valor da transação"
              onChange={(e) => setTransaction({ ...transaction, amount: e.target.value })}
            />
          </div>

          {errorMessage && (
            <div className="text-sm text-red-600 font-medium">
              {errorMessage}
            </div>
          )}
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button color="dark" disabled={isLoading} onClick={handleSave}>
          {isLoading ? <Spinner size="sm" /> : "Salvar"}
        </Button>
        <Button color="gray" disabled={isLoading} onClick={() => setIsOpen(false)}>
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TransactionModal;