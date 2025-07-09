import React, { useEffect, useState } from "react";
import { LucideCalendarCheck2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAvailableCycles } from "../Redux/slice/employeeSlice";


const History = () => {
  const dispatch = useDispatch();
  const { cycles, cyclesLoading, cyclesError } = useSelector((state) => state.employee);

  const [selectedCycle, setSelectedCycle] = useState(null);

  useEffect(() => {
    dispatch(fetchAvailableCycles());
  }, [dispatch]);

  const handleDownload = () => {
    if (!selectedCycle) {
      alert("Please select a cycle first");
      return;
    }
    // Open the PDF link in a new tab
    window.open(`http://68.183.6.149:8000/employee/employee-pdf?cycle=${selectedCycle}`, "_blank");
  };

  return (
    <div className="p-6 w-full max-w-5xl mx-auto">
      <h1 className="font-bold text-2xl text-center text-gray-800 bg-white rounded-full py-3 px-8 shadow-md mb-10">
        Task History
      </h1>

      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-lg border border-blue-200 p-10">
        <div className="flex flex-col items-center text-center gap-6">
          <div className="bg-white p-4 rounded-full shadow-md">
            <LucideCalendarCheck2 size={64} className="text-blue-600" />
          </div>

          {cyclesLoading && <p className="text-blue-600 font-medium">Loading cycles...</p>}
          {cyclesError && <p className="text-red-500 font-medium">{cyclesError}</p>}

          {!cyclesLoading && !cyclesError && Array.isArray(cycles) && (
            <>
              <label htmlFor="cycle" className="text-lg font-semibold text-gray-700">
                Select Cycle:
              </label>
              <select
                id="cycle"
                className="rounded-md border border-gray-300 p-2 w-48 text-center"
                value={selectedCycle || ""}
                onChange={(e) => setSelectedCycle(e.target.value)}
              >
                <option value="" disabled>
                  -- Choose a cycle --
                </option>
               {cycles.map(cycle => (
      <option key={cycle} value={cycle}>Cycle {cycle}</option>
    ))}
              </select>

              <button
                className="mt-4 bg-blue-600 hover:bg-blue-700 cursor-pointer text-white font-semibold py-2 px-8 rounded-full shadow-sm transition duration-200 disabled:bg-blue-300"
                onClick={handleDownload}
                disabled={!selectedCycle}
              >
                Download PDF
              </button>
            </>
          )}

          <p className="text-gray-700 font-medium mt-6">
            Download your task history as a PDF report.
          </p>
        </div>
      </div>
    </div>
  );
};

export default History;
