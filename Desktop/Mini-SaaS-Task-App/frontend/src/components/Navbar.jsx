import { useAuth } from '../contexts/AuthContext.jsx';

const Navbar = () => {
  const { logout, user } = useAuth();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-800">TaskSaaS</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">{user?.email}</span>
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

