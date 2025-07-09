import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { BiSolidNotepad } from "react-icons/bi";
import { MdWorkHistory } from "react-icons/md";
import MobileSidebar from "./MobileSidebar";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex flex-1 pt-[72px] flex-col">
        <MobileSidebar />

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
