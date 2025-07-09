import { BiSolidNotepad } from "react-icons/bi";
import { MdWorkHistory } from "react-icons/md";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 py-3 px-5 text-lg font-semibold rounded-4xl shadow cursor-pointer transition duration-200 ${
      isActive
        ? "bg-blue-100 text-blue-700"
        : "bg-white text-gray-800 hover:bg-blue-50"
    }`;

  return (
    <div className="flex flex-col gap-6 mt-10 px-4">
      <NavLink to="/dashboard" className={linkClasses}>
        <BiSolidNotepad className="text-blue-600 text-xl" />
        To-Do Tasks
      </NavLink>

      <NavLink to="/history" className={linkClasses}>
        <MdWorkHistory className="text-blue-600 text-xl" />
        History
      </NavLink>
    </div>
  );
};

export default Sidebar;
