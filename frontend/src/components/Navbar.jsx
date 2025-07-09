import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

import { logo, profileHolder } from "../assets/logo";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 px-4 py-4 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div
          className="flex items-center gap-2 flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={handleLogoClick}
        >
          <img src={logo} alt="DSEU Logo" className="h-14" />
        </div>

        <div className="relative flex-1 max-w-2xl mx-4 hidden md:block">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-gray-50 border border-gray-200 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
        </div>

        {/* Right: Profile Icon */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleProfileClick}
            className="flex items-center gap-2 p-1.5 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
          >
            <img
              src={profileHolder}
              alt="Profile"
              className="w-14 h-14 rounded-full border-2 border-gray-200 object-cover"
            />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
