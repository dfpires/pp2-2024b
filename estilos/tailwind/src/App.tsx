import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ClientList from './pages/ClientList';
import CreateClient from './pages/CreateClient';
import UpdateClient from './pages/UpdateClient';
import Login from './pages/Login';

const App = () => {
  const [user, setUser] = useState<string | null>(null); // Estado para armazenar o usuário logado

  // Função de logout
  const handleLogout = () => {
    setUser(null); // Limpa o estado do usuário
  };

  return (
    <Router>
      <div className="flex">
        {user ? <Sidebar username={user} handleLogout={handleLogout} /> : null} {/* Exibe a Sidebar se o usuário estiver logado */}
        <div className="flex-grow p-5">
          <Routes>
            <Route path="/" element={user ? <Navigate to="/clients" /> : <Login setUser={setUser} />} />
            <Route path="/clients" element={user ? <ClientList /> : <Navigate to="/" />} />
            <Route path="/clients/create" element={user ? <CreateClient /> : <Navigate to="/" />} />
            <Route path="/clients/update/:id" element={user ? <UpdateClient /> : <Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;