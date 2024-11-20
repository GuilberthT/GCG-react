import React, { useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

// Importar páginas
// import HomeView from './pages/home/HomeView';
// import RegisterPage from './pages/register/RegisterPage';
import ExpensesPage from './pages/expenses/ExpensesPage';
import { IncomePage } from './pages/incomes/IncomePage';
import { LoginPage } from './pages/login/LoginPage';
import { HomePage } from './pages/home/HomeView';

// Função de verificação de autenticação

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = useMemo(() => !!Cookies.get('token'), [Cookies]);
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const AppRouter: React.FC = () => (
  <Router>
    <Routes>
      {/* //Rota de login, onde o token é removido ao acessar a página// */}
      { <Route path="/login" element={<LoginPage />} /> }
      {/* <Route path="/register" element={<RegisterPage />} /> */} 

      { <Route path="/home" element={<HomePage />} /> }
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <div>

            </div>
            {/* <HomeView /> */}
          </ProtectedRoute>
        }
      />
      <Route
        path="/expenses"
        element={
          <ProtectedRoute>
            <div>

              
            </div>
            {/* <ExpensesPage /> */}
          </ProtectedRoute>
        }
      />
      <Route
        path="/incomes"
        element={
          <ProtectedRoute>
            <IncomePage />
          </ProtectedRoute>
        }
      />
    </Routes>
  </Router>
);

export default AppRouter;