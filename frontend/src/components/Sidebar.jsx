import { BiSolidNotepad } from "react-icons/bi";
import { MdWorkHistory } from "react-icons/md";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="flex flex-col gap-6 mt-10 px-4">
      <h1 className="flex items-center gap-3 py-3 px-5 text-lg font-semibold text-gray-800 bg-white rounded-4xl shadow hover:bg-blue-50 cursor-pointer transition duration-200">
        <BiSolidNotepad className="text-blue-600 text-xl" />
        To-Do Tasks
      </h1>
      <Link to={"/history"}>
      <h1 className="flex items-center gap-3 py-3 px-5 text-lg font-semibold text-gray-800 bg-white rounded-4xl shadow hover:bg-blue-50 cursor-pointer transition duration-200">
        <MdWorkHistory className="text-blue-600 text-xl" />
        History
      </h1>
      </Link>
    </div>
  );
};

export default Sidebar;
