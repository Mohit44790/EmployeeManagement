import { BiSolidNotepad } from "react-icons/bi";
import { MdWorkHistory } from "react-icons/md";
import { NavLink } from "react-router-dom";


const MobileSidebar = () => {
  return (
    <div className="mt-10 flex flex-col md:hidden gap-1 mb-4 mx-10 justify-center">
      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          `flex items-center gap-3 py-3 px-5 text-lg font-semibold rounded-4xl shadow transition duration-200 ${
            isActive
              ? "bg-blue-100 text-blue-700"
              : "bg-white text-gray-800 hover:bg-blue-50"
          }`
        }
      >
        <BiSolidNotepad className="text-blue-600 text-xl" />
        To-Do Tasks
      </NavLink>

      <NavLink
        to="/history"
        className={({ isActive }) =>
          `flex items-center gap-3 py-3 px-5 text-lg font-semibold rounded-4xl shadow transition duration-200 ${
            isActive
              ? "bg-blue-100 text-blue-700"
              : "bg-white text-gray-800 hover:bg-blue-50"
          }`
        }
      >
        <MdWorkHistory className="text-blue-600 text-xl" />
        History
      </NavLink>
    </div>
  );
};

export default MobileSidebar;
