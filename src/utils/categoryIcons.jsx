import { FaDollarSign } from "react-icons/fa";
import { MdShoppingCart, MdRestaurant, MdLocalGroceryStore, MdDirectionsRun, MdHomeRepairService, MdLocalMovies, MdSavings, MdAttachMoney, MdSubscriptions, MdWifi } from "react-icons/md";
import { BiSolidDonateHeart } from "react-icons/bi";
import { FaHeartPulse, FaPlane, FaGraduationCap, FaPercent } from "react-icons/fa6";
import { GiMoneyStack } from "react-icons/gi";

// Função para obter o ícone da categoria
export const getCategoryIcon = (category) => {
  switch (category) {
    // Expense
    case 'food':
      return <MdRestaurant size={20} className="text-orange-500" />;
    case 'rent':
      return <MdHomeRepairService size={20} className="text-gray-600" />;
    case 'utilities':
      return <MdLocalGroceryStore size={20} className="text-blue-500" />;
    case 'transport':
      return <MdDirectionsRun size={20} className="text-purple-500" />;
    case 'health':
      return <FaHeartPulse size={20} className="text-red-500" />;
    case 'education':
      return <FaGraduationCap size={20} className="text-indigo-500" />;
    case 'entertainment':
      return <MdLocalMovies size={20} className="text-pink-500" />;
    case 'shopping':
      return <MdShoppingCart size={20} className="text-blue-500" />;
    case 'subscriptions':
      return <MdSubscriptions size={20} className="text-cyan-500" />;
    case 'taxes':
      return <FaPercent size={20} className="text-yellow-600" />;
    case 'debt':
      return <GiMoneyStack size={20} className="text-red-600" />;
    case 'other_expense':
      return <FaDollarSign size={20} className="text-gray-500" />;

    // Income
    case 'salary':
      return <MdAttachMoney size={20} className="text-green-600" />;
    case 'freelance':
      return <MdAttachMoney size={20} className="text-green-500" />;
    case 'investment_return':
      return <GiMoneyStack size={20} className="text-green-700" />;
    case 'refund':
      return <MdAttachMoney size={20} className="text-green-500" />;
    case 'gift':
      return <BiSolidDonateHeart size={20} className="text-pink-500" />;
    case 'other_income':
      return <FaDollarSign size={20} className="text-green-600" />;

    // Savings
    case 'emergency_fund':
      return <MdSavings size={20} className="text-green-600" />;
    case 'investments':
      return <GiMoneyStack size={20} className="text-blue-600" />;
    case 'travel':
      return <FaPlane size={20} className="text-cyan-500" />;
    case 'long_term_goal':
      return <MdSavings size={20} className="text-indigo-600" />;
    case 'other_savings':
      return <MdSavings size={20} className="text-green-600" />;

    // Default
    default:
      return <FaDollarSign size={20} className="text-gray-400" />;
  }
};

