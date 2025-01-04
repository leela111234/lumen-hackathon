import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-white text-black min-h-screen">
      <div className="p-4">
        <h2 className="text-2xl font-semibold text-center text-blue-600">Inventory Management</h2>
      </div>
      <nav>
        <ul>
          <li className="hover:bg-blue-400">
            <Link to="/dashboard" className="block py-3 px-6">Dashboard</Link>
          </li>
          <li className="hover:bg-blue-400">
            <Link to="/product-management" className="block py-3 px-6">Product Management</Link>
          </li>
          <li className="hover:bg-blue-400">
            <Link to="/supplier-management" className="block py-3 px-6">Supplier Management</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
