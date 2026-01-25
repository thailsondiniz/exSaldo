import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { IoIosAdd } from "react-icons/io";
import axios from "axios";
import { API_URL } from "../config.js";

const TABLE_HEAD = ["Data", "Descrição", "Categoria", "Valor", "Ações"];


const Transactions = () => {
  const location = useLocation()
  const [open, setOpen] = useState(false);
  const today = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState(today);

  const [transactions, setTransactions] = useState([]);

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
  return (
    <div className='p-8 w-full bg-[#F1F5F9] min-h-screen'>
      <div className='mb-6 flex items-center justify-between'>
        <div className="">
          <h1 className="text-2xl font-semibold">Transações</h1>
          <p>Gerencie suas transações aqui.</p>
        </div>
        <div>
          <button
            onClick={() => setOpen(true)}
            className="mt-4 px-4 py-2 flex items-center cursor-pointer bg-blue-600 text-white rounded hover:bg-blue-700">
            <IoIosAdd size={30} /> Nova Transação
          </button>
        </div>
      </div>
      {
        open && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-96">
              <h2 className="text-xl font-semibold mb-4">Adicionar Nova Transação</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tipo</label>
                  <select className="mt-1 block w-full border border-gray-300 rounded-md p-2">
                    <option>Receita</option>
                    <option>Despesa</option>
                    <option>Poupança</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Descrição</label>
                  <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Categoria</label>
                  <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Valor</label>
                  <input type="number" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
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
                    onClick={() => setOpen(false)}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancelar</button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Salvar</button>
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
                <tr key={transaction.id}>
                  <td className={classes}>
                    <p className="text-sm text-gray-700 font-normal">
                      {new Intl.DateTimeFormat("pt-BR").format(new Date(transaction.date))}
                    </p>
                  </td>
                  <td className={classes}>
                    <p className="text-sm text-gray-700 font-normal">
                      {transaction.description}
                    </p>
                  </td>
                  <td className={classes}>
                    <p className="text-sm text-gray-700 font-normal">
                      {transaction.category}
                    </p>
                  </td>
                  <td className={classes}>
                    <p className={`text-sm font-medium ${transaction.type === 'expense' ? 'text-red-600' : 'text-green-600'
                      }`}>
                      R$ {transaction.amount.toFixed(2)}
                    </p>
                  </td>
                  <td className={classes}>
                    <a
                      href="#"
                      className="text-sm font-medium text-blue-600 hover:text-blue-800"
                    >
                      Edit
                    </a>
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



