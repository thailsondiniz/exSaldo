import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { IoNotificationsOutline } from "react-icons/io5";
import { BiSolidMoon } from "react-icons/bi";
import { FiSun } from "react-icons/fi";
const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Transação realizada com sucesso", timestamp: "10 min" },
    { id: 2, message: "Novo depósito recebido", timestamp: "1 hora" },
  ]);

  const handleRemoveNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <nav className={`${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"} shadow-lg border-b ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}>
      <div className="px-6 py-4 flex items-center justify-between">
        {/* Lado esquerdo - Vazio ou logo */}
        <div />

        {/* Lado direito - Nome, Notificações e Dark Mode */}
        <div className="flex items-center gap-6">
          {/* Nome do usuário */}
          <span className="font-semibold text-lg">
            Olá, {user?.name || "Usuário"}
          </span>

          {/* Botão de Notificações */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className={`relative p-2 rounded-full cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"}`}
              title="Notificações"
            >
              <IoNotificationsOutline size={25} className={`${isDarkMode ? "text-white" : "text-gray-900"}`} />

              {notifications.length > 0 && (
                <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </button>

            {/* Dropdown de Notificações */}
            {showNotifications && (
              <div className={`absolute right-0 mt-2 w-80 rounded-lg shadow-xl z-50 ${isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"}`}>
                <div className={`p-4 border-b ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}>
                  <h3 className="font-bold text-lg">Notificações</h3>
                </div>
                {notifications.length > 0 ? (
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`p-4 border-b ${isDarkMode ? "border-gray-700" : "border-gray-100"} flex justify-between items-start gap-4`}
                      >
                        <div className="flex-1">
                          <p className={isDarkMode ? "text-gray-100" : "text-gray-800"}>
                            {notif.message}
                          </p>
                          <p className={`text-sm mt-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                            {notif.timestamp}
                          </p>
                        </div>
                        <button
                          onClick={() => handleRemoveNotification(notif.id)}
                          className={`text-xs px-2 py-1 rounded ${isDarkMode ? "bg-red-600 hover:bg-red-700" : "bg-red-100 hover:bg-red-200 text-red-700"}`}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    Nenhuma notificação
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Botão Dark Mode */}
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-800 transition-colors ${isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"}`}
            title={isDarkMode ? "Modo claro" : "Modo escuro"}
          >
            {isDarkMode ? (
             <FiSun size={25}/>
            ) : (
             <BiSolidMoon size={25}/>
            )}
          </button>

          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
