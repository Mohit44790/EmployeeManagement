import React from 'react';

const Dashboard = () => {

      const today = new Date();

  // Format date as DD-MM-YYYY
  const formattedDate = today.toLocaleDateString('en-GB'); 
  
  const formattedDateWithDashes = formattedDate.replace(/\//g, '-');
  return (
    <div className="p-6 w-full max-w-7xl mx-auto">
      {/* Header */}
      <h1 className="font-bold text-xl text-center text-gray-800 bg-white rounded-full py-3 px-6 shadow-md cursor-pointer hover:bg-gray-100 transition-colors">
        Today's To-Do Tasks
      </h1>

      {/* Task Container */}
      <div className="mt-10 bg-blue-50 rounded-2xl shadow-inner border border-blue-200 p-6">
        {/* Date Header */}
        <h2 className="font-semibold text-lg text-center text-gray-900 bg-white rounded-full py-2 px-6 shadow-md cursor-pointer hover:bg-gray-100 transition-colors mb-8 max-w-md mx-auto">
          Date: {formattedDateWithDashes}
        </h2>

        {/* Table header */}
        <div className="hidden md:grid grid-cols-6 gap-4 text-sm font-semibold text-gray-700 px-4 py-2 border-b border-gray-300 mb-4">
          <div>S.No.</div>
          <div>Faculty Name</div>
          <div>Time Table</div>
          <div>Campus Name</div>
          <div>Location</div>
          <div>Remarks</div>
        </div>

        {/* Example Task Item */}
        <div className="grid grid-cols-6 gap-4 text-sm text-gray-800 px-4 py-3 bg-white rounded-lg mb-3 shadow-sm items-center">
          <div>1</div>
          <div>Dr. John Doe</div>
          <div>9 AM - 11 AM</div>
          <div>Main Campus</div>
          <div>Building A, Room 101</div>
          <div>Bring lab materials</div>
        </div>

        {/* Add more task rows here */}
      </div>
    </div>
  );
};

export default Dashboard;
