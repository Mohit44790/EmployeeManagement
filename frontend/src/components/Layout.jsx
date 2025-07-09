import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { BiSolidNotepad } from "react-icons/bi";
import { MdWorkHistory } from "react-icons/md";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex flex-1 pt-[72px] flex-col">
        <div className="mt-10 flex flex-col md:hidden gap-1 mb-4 mx-10 justify-center">
          <h1 className="flex items-center gap-3 py-3 px-5 text-lg font-semibold text-gray-800 bg-white rounded-4xl shadow hover:bg-blue-50 cursor-pointer transition duration-200">
            <BiSolidNotepad className="text-blue-600 text-xl" />
            To-Do Tasks
          </h1>
          <h1 className="flex items-center gap-3 py-3 px-5 text-lg font-semibold text-gray-800 bg-white rounded-4xl shadow hover:bg-blue-50 cursor-pointer transition duration-200">
            <MdWorkHistory className="text-blue-600 text-xl" />
            History
          </h1>
        </div>

        {/* Fixed sidebar: height fills the viewport minus navbar */}
        <aside className="w-72 h-[calc(100vh-72px)] fixed top-[72px] left-0 bg-gray-100 p-4 overflow-auto hidden md:block">
          <Sidebar />
        </aside>

        {/* Main content with left margin to avoid under sidebar */}
        <main className="flex-1 bg-gray-50 md:p-4 p-2 md:ml-72 overflow-auto h-[calc(100vh-72px)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
