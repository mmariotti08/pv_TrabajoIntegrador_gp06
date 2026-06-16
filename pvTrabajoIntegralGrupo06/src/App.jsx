import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AdminProvider } from './context/AdminContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import Header from './components/layout/Header';
import Login from './views/Login';
import Dashboard from './views/Dashboard';
import ListaClientes from './views/ListaClientes';
import DetalleCliente from './views/DetalleCliente';

function App() {
  return (
    <AdminProvider>
      <BrowserRouter>
       
        <Header /> 
        
        <Routes>
          
          <Route path="/login" element={<Login />} />

          
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/clientes" element={<ListaClientes />} />
            <Route path="/clientes/:id" element={<DetalleCliente />} />
          </Route>

         
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AdminProvider>
  );
}

export default App;
