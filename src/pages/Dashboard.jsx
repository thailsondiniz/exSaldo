import { useContext, useState, useEffect } from "react";
import DashboardCard from "../components/DashboardCard";
import { AuthContext } from "../contexts/AuthContext";
import { FaHandHoldingUsd } from "react-icons/fa";
import { MdAccountBalanceWallet } from "react-icons/md";
import { LiaPiggyBankSolid } from "react-icons/lia";
import { BsCashCoin } from "react-icons/bs";
import axios from "axios";
import { API_URL } from "../config.js";
const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [renda, setRenda] = useState(0);
  const [despesas, setDespesas] = useState(0);
  const [poupanca, setPoupanca] = useState(0);
  const saldo = renda - despesas;

  useEffect(()=>{
    async function dashboardData(){
     try {
       const response = await axios.get(`${API_URL}/transactions`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const transactions = response.data.transactions || [];
      
      let totalRenda = 0;
      let totalDespesas = 0;
      let totalPoupanca = 0;
      
      transactions.forEach(transaction => {
        if (transaction.type === "income") {
          totalRenda += transaction.amount;
        } else if (transaction.type === "expense") {
          totalDespesas += transaction.amount;
        } else if (transaction.type === "savings") {
          totalPoupanca += transaction.amount;
        }
      });
      
      setRenda(totalRenda);
      setDespesas(totalDespesas);
      setPoupanca(totalPoupanca);
      console.log("Dados do dashboard:", { totalRenda, totalDespesas, totalPoupanca });
     } catch (error) {
        console.error("Erro ao buscar dados do dashboard:", error);
     }
    }
    dashboardData();
  }, []);
  return (
    <div className="p-8 w-full bg-[#F1F5F9] min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-4 w-full">
        <DashboardCard icon={<MdAccountBalanceWallet color="#2E4CAD" size={28}/>} title="Saldo" value={`R$ ${saldo}`} percent={8} />
        <DashboardCard icon={<FaHandHoldingUsd color="#2E4CAD" size={28}/>} title="Renda" value={`R$ ${renda}`} percent={12} />
        <DashboardCard icon={<LiaPiggyBankSolid color="#2E4CAD" size={28}/>} title="Poupança" value={`R$ ${poupanca}`} percent={15} />
         <DashboardCard icon={<BsCashCoin color="#2E4CAD" size={28}/>} title="Despesas" value={`R$ ${despesas}`} percent={-3} />
      </div>
    </div>
  );
};

export default Dashboard;
