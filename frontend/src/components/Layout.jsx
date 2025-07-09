import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex flex-1 pt-[72px]">
        {/* Fixed sidebar: height fills the viewport minus navbar */}
        <aside className="w-72 h-[calc(100vh-72px)] fixed top-[72px] left-0 bg-gray-100 p-4 overflow-auto">
          <Sidebar />
        </aside>

        {/* Main content with left margin to avoid under sidebar */}
        <main className="flex-1 bg-gray-50 p-4 ml-72 overflow-auto h-[calc(100vh-72px)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
