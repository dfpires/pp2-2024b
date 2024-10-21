
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto">
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="text-white">
              Home
            </Link>
          </li>
          <li>
            <Link to="/users" className="text-white">
              Usuários
            </Link>
          </li>
          <li>
            <Link to="/products" className="text-white">
              Produtos
            </Link>
          </li>
          <li>
            <Link to="/orders" className="text-white">
              Pedidos
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
