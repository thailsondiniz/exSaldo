import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { IoIosAdd } from "react-icons/io";
import { FaDollarSign } from "react-icons/fa";
import axios from "axios";
import { API_URL } from "../config.js";
import { MdDelete } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";
import { typeTranslations, categoryTranslations } from "../utils/translations.js";
import toast, { Toaster } from 'react-hot-toast';
import { companiesLogo, COMPANIES_KEYWORDS } from "../utils/logos.js";
import { getCategoryIcon } from "../utils/categoryIcons";
import { MdWifi } from "react-icons/md";
const TABLE_HEAD = ["Data", "Descrição", "Categoria", "Valor", "Ações"];

const Transactions = () => {
  const location = useLocation()
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState(null);
  const today = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState(today);

  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  
  const [isEditing, setIsEditing] = useState(false);
  const [editingTransactionId, setEditingTransactionId] = useState(null);

  const getCompanyLogo = (description) => {
    if (!description) return null;

    const descriptionLower = description.toLowerCase();

    for (const [company, keywords] of Object.entries(COMPANIES_KEYWORDS)) {
      if (keywords.some(keyword => descriptionLower.includes(keyword))) {
        return companiesLogo[company];
      }
    }

    return null;
  };

  const getDisplayIcon = (description, category) => {
    const descriptionLower = description?.toLowerCase() || '';

    if (descriptionLower.includes('internet')) {
      return <MdWifi size={20} className="text-blue-600" />;
    }

    const logo = getCompanyLogo(description);

    if (logo) {
      return (
        <img
          src={logo}
          alt={description}
          className="w-8 h-8 rounded-full object-cover"
        />
      );
    }

    return getCategoryIcon(category);
  };

  const formatCurrency = (value) => {
    if (!value) return '';

    const numericValue = value.replace(/\D/g, '');

    const numberValue = parseInt(numericValue) / 100;

    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(numberValue);
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(formatCurrency(value));
  };

  useEffect(() => {
    console.log('Transactions página carregada:', location.pathname)
  }, [location.pathname])

  useEffect(() => {
    async function getTransactions() {
      try {
        const response = await axios.get(`${API_URL}/transactions`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const transactions = response.data.transactions || [];
        setTransactions(transactions);
      } catch (error) {
        console.log('Erro ao buscar transações:', error);
      }
    }
    getTransactions()
  }, []);

  useEffect(() => {
    async function getCategories() {
      if (!selectedType) {
        setCategories([]);
        return;
      }
      try {
        const response = await axios.get(`${API_URL}/categories/${selectedType}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const categories = response.data.data || [];
        setCategories(categories);
      } catch (error) {
        console.log('Erro ao buscar categorias:', error);
      }
    }
    getCategories()
  }, [selectedType])

  useEffect(() => {
    async function getTypeTransactions() {
      try {
        console.log('Buscando tipos de transação...');
        const response = await axios.get(`${API_URL}/type-transaction`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log('Resposta de tipos:', response.data);
        const types = response.data.data || [];
        console.log('Tipos processados:', types);
        setTypes(types);
      } catch (error) {
        console.error('Erro ao buscar tipos de transações:', error.response?.data || error.message);
      }
    }
    getTypeTransactions()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const numericAmount = parseFloat(amount.replace(/[^\d,]/g, '').replace(',', '.'));

    const payload = {
      description,
      amount: numericAmount,
      date,
      type: selectedType,
      category: selectedCategory,
    };
    if (!payload.description || !payload.amount || !payload.date || !payload.type || !payload.category) {
      toast.error('Por favor, preencha todos os campos.');
      return;
    }

    try {
      if (isEditing && editingTransactionId) {
        // Atualizar transação
        const response = await axios.put(`${API_URL}/transactions/${editingTransactionId}`, payload, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setTransactions(transactions.map(t => t._id === editingTransactionId ? response.data.transaction : t));
        toast.success('Transação atualizada com sucesso!');
      } else {
        // Criar nova transação
        const response = await axios.post(`${API_URL}/transactions`, payload, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setTransactions([...transactions, response.data.transaction]);
        toast.success('Transação criada com sucesso!');
      }
      
      setOpen(false);
      setDescription('');
      setAmount('');
      setDate(today);
      setSelectedType('');
      setSelectedCategory('');
      setCategories([]);
      setIsEditing(false);
      setEditingTransactionId(null);
    } catch (error) {
      console.error('Erro ao salvar transação:', error.response?.data || error.message);
      toast.error('Erro ao salvar transação. Por favor, tente novamente.');
    }

  }

  const handleDeleteTransaction = async (transactionId) => {
    console.log('Deletando transação com ID:', transactionId);
    try {
      const response = await axios.delete(`${API_URL}/transactions/${transactionId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log('Resposta da exclusão:', response);
      setTransactions(transactions.filter(transaction => transaction._id !== transactionId));
      toast.success('Transação deletada com sucesso!');
      setOpenDelete(false);
      setTransactionToDelete(null);
    } catch (error) {
      console.error('Erro ao deletar transação:', error);
      console.error('Erro detalhes:', error.response?.data || error.message);
      toast.error('Erro ao deletar transação. Por favor, tente novamente.');
    }
  }

  return (
    <div className='p-8 w-full bg-[#F1F5F9] min-h-screen'>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <div className='mb-6 flex items-center justify-between'>
        <div className="">
          <h1 className="text-2xl font-semibold">Transações</h1>
          <p>Gerencie suas transações aqui.</p>
        </div>
        <div>
          <button
            onClick={() => {
              setIsEditing(false);
              setEditingTransactionId(null);
              setDescription('');
              setAmount('');
              setDate(today);
              setSelectedType('');
              setSelectedCategory('');
              setCategories([]);
              setOpen(true);
            }}
            className="mt-4 px-4 py-2 flex items-center cursor-pointer bg-blue-600 text-white rounded hover:bg-blue-700">
            <IoIosAdd size={30} /> Nova Transação
          </button>
        </div>
      </div>
      {
        openDelete && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-96">
              <h2 className="text-xl font-semibold mb-4">Confirmar Exclusão</h2>
              <p className="mb-4">Tem certeza de que deseja excluir esta transação?</p>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setOpenDelete(false);
                    setTransactionToDelete(null);
                  }}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 cursor-pointer">Cancelar</button>
                <button
                  type="button"
                  onClick={() => {
                    console.log('Clicou em excluir, ID:', transactionToDelete);
                    if (transactionToDelete) {
                      handleDeleteTransaction(transactionToDelete);
                    }
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer">Excluir</button>
              </div>
            </div>
          </div>
        )
      }
      {
        open && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-96">
              <h2 className="text-xl font-semibold mb-4">
                {isEditing ? 'Editar Transação' : 'Adicionar Nova Transação'}
              </h2>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tipo</label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2">
                    <option value="">Selecione um tipo</option>
                    {types.map((type) => (
                      <option key={type} value={type}>{typeTranslations[type]}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Descrição</label>
                  <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md p-2" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Categoria</label>
                  {/* <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md p-2" /> */}
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    disabled={!selectedType}>
                    <option value="">Selecione uma categoria</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>{categoryTranslations[category]}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Valor</label>
                  <input
                    type="text"
                    className="block w-full border border-gray-300 rounded-md p-2"
                    value={amount}
                    onChange={handleAmountChange}
                    placeholder='R$ 0,00'
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Data</label>
                  <input
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    type="date" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      setIsEditing(false);
                      setEditingTransactionId(null);
                    }}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 cursor-pointer">Cancelar</button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer">
                    {isEditing ? 'Atualizar' : 'Salvar'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )
      }
      <div className="bg-white rounded-lg shadow h-full w-full overflow-x-auto">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="p-4 text-sm font-normal text-gray-600 leading-none"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => {
              const isLast = index === transactions.length - 1;
              const classes = isLast ? "p-4" : "p-4 border-b border-gray-100";
              return (
                <tr key={transaction._id}>
                  <td className={classes}>
                    <p className="text-sm text-gray-700 font-normal">
                      {new Intl.DateTimeFormat("pt-BR").format(new Date(transaction.date))}
                    </p>
                  </td>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      {getDisplayIcon(transaction.description, transaction.category)}
                      <p className="text-sm text-gray-700 font-normal">
                        {transaction.description}
                      </p>
                    </div>
                  </td>
                  <td className={classes}>
                    <p className="text-sm text-gray-700 font-normal">
                      {categoryTranslations[transaction.category] || transaction.category}
                    </p>
                  </td>
                  <td className={classes}>
                    <p className={`text-sm font-medium ${transaction.type === 'expense' ? 'text-red-600' : 'text-green-600'
                      }`}>
                      R$ {transaction.amount.toFixed(2)}
                    </p>
                  </td>
                  <td className={classes + " flex gap-4"}>
                    <MdModeEditOutline 
                      size={20} 
                      className="cursor-pointer hover:text-blue-600" 
                      onClick={() => {
                        setIsEditing(true);
                        setEditingTransactionId(transaction._id);
                        setDescription(transaction.description);
                        setAmount(new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        }).format(transaction.amount));
                        setDate(transaction.date.split('T')[0]);
                        setSelectedType(transaction.type);
                        setSelectedCategory(transaction.category);
                        setOpen(true);
                      }}
                    />
                    <MdDelete size={20} className="cursor-pointer hover:text-red-600" color='red' onClick={()=> {
                      console.log('ID da transação:', transaction._id);
                      setTransactionToDelete(transaction._id);
                      setOpenDelete(true);
                    }}/>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Transactions



