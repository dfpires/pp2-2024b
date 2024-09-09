import { Link } from 'react-router-dom';

const Sidebar = ({ username, handleLogout }: { username: string; handleLogout: () => void }) => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-5">
      <h2 className="text-2xl mb-6">Menu</h2>
      <p className="mb-6">Bem-vindo, {username || 'Guest'}!</p>
      <ul>
        <li className="mb-4">
          <Link to="/clients/create" className="text-white hover:text-gray-400">Inserção de Cliente</Link>
        </li>
        <li className="mb-4">
          <Link to="/clients" className="text-white hover:text-gray-400">Consulta de Clientes</Link>
        </li>
      </ul>
      <button
        onClick={handleLogout}
        className="mt-6 bg-red-500 text-white px-4 py-2 w-full rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;