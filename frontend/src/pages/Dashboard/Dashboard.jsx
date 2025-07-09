import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDailyUpdates } from "../../Redux/slice/employeeSlice";
import UpdateModal from "../../components/UpdateModal";

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedEmpId, setSelectedEmpId] = useState(null);

  const dispatch = useDispatch();
  const { employeeList, loading, error } = useSelector(
    (state) => state.employee
  );

  useEffect(() => {
    dispatch(fetchDailyUpdates());
  }, [dispatch]);

  const today = new Date();
  const formattedDateWithDashes = today
    .toLocaleDateString("en-GB")
    .replace(/\//g, "-");

  return (
    <div className="py-6 px-1 w-full max-w-7xl mx-auto">
      <h1 className="font-bold text-xl text-center text-gray-800 bg-white rounded-full py-3 px-6 shadow-md mb-10">
        Today's To‑Do Tasks
      </h1>

      <div className="bg-blue-50 rounded-2xl shadow-inner border border-blue-200 py-6 overflow-auto px-4">
        <h2 className="font-semibold text-lg text-center text-gray-900 bg-white rounded-full py-2 px-6 shadow-md mb-8 max-w-md mx-auto">
          Date: {formattedDateWithDashes}
        </h2>

        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border border-gray-300 bg-white rounded-lg shadow-sm overflow-hidden">
              <thead className="bg-gray-100 text-gray-700 text-sm">
                <tr>
                  <th className="border px-4 py-2">S.No.</th>
                  <th className="border px-4 py-2 text-left">Name</th>
                  <th className="border px-4 py-2 text-left">Phone</th>
                  <th className="border px-4 py-2 text-left">Designation</th>
                  <th className="border px-4 py-2 text-left">Campus</th>
                  <th className="border px-4 py-2 text-left">Location</th>
                  <th className="border px-4 py-2 text-left">Timetable</th>
                  <th className="border px-4 py-2 text-left">Photo</th>
                  <th className="border px-4 py-2 text-left">Remarks</th>
                  <th className="border px-4 py-2 text-left">Upload</th>
                </tr>
              </thead>
              <tbody>
                {employeeList.map((emp, index) => (
                  <tr
                    key={emp._id}
                    className="text-sm text-gray-800 hover:bg-gray-50"
                  >
                    <td className="border px-4 py-2 text-center">
                      {index + 1}
                    </td>
                    <td className="border px-4 py-2">{emp.name}</td>
                    <td className="border px-4 py-2">{emp.phone || "-"}</td>
                    <td className="border px-4 py-2">{emp.designation}</td>
                    <td className="border px-4 py-2">
                      {typeof emp.campus === "object"
                        ? emp.campus.name
                        : emp.campus || "-"}
                    </td>
                    <td className="border px-4 py-2">
                      {emp.location ? (
                        <a
                          href={emp.location}
                          target="_blank"
                          className="text-blue-600 underline text-sm"
                        >
                          Location
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>

                    <td className="border px-4 py-2">
                      {emp.timetable_pdf ? (
                        <a
                          href={emp.timetable_pdf}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline text-sm"
                        >
                          View PDF
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="border px-4 py-2">
                      {emp.classroom_photo ? (
                        <a
                          href={emp.classroom_photo}
                          target="_blank"
                          className="text-blue-600 underline text-sm"
                        >
                          View Photo
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="border px-4 py-2">{emp.remarks || "-"}</td>
                    <td className="border px-4 py-2 text-center">
                      <button
                        onClick={() => {
                          setSelectedEmpId(emp._id);
                          setShowModal(true);
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium py-1 px-3 rounded-full transition-all cursor-pointer"
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showModal && (
        <UpdateModal
          empId={selectedEmpId}
          onClose={() => setShowModal(false)}
          onSuccess={() => dispatch(fetchDailyUpdates())}
        />
      )}
    </div>
  );
};

export default Dashboard;
