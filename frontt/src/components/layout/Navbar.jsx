import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import UserMenu from "./UserMenu";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 p-4 flex justify-end  items-center  ">
      <div className="flex lg:w-1/4 md:w-1/3 w-2/4 justify-between">

        <div className="flex items-center gap-x-4">
          <Link to="/" aria-label="Accueil" className="text-white text-2xl">
            <FaHome />
          </Link>
        </div>

        <div className="flex items-center gap-x-4">
          <UserMenu/>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
