import { Link } from "react-router-dom";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import { useState } from "react";
import useAuthLogout from "../../hooks/useAuthLogout";
const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: logout, isPending } = useAuthLogout();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleMenu}
        className="text-white text-2xl flex items-center"
      >
        <FaUser />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 bg-gray-800 text-white p-2 rounded shadow-lg">
          <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block px-4 py-2 hover:bg-gray-700">
            Profil
          </Link>
          <button
            onClick={() => logout()}
            disabled={isPending}
            className="block px-4 py-2 hover:bg-gray-700 w-full text-left"
          >
            <FaSignOutAlt className="mr-2" />
            Déconnexion
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
