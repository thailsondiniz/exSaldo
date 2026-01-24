import './App.css'
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext.jsx'
import { ThemeProvider } from './contexts/ThemeContext.jsx'
import AppRoutes from './routes/AppRoutes.jsx';
function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <AppRoutes />
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
