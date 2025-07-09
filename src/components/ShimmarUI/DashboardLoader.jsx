const DashboardLoader = () => {
  return (
    <div className="py-6 px-1 w-full max-w-7xl mx-auto animate-pulse mt-10">
      <div className="h-10 bg-gray-200 rounded-full max-w-xs mx-auto mb-8" />

      <div className="bg-blue-50 rounded-2xl shadow-inner border border-blue-200 py-6 px-4">

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-300 bg-white rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-gray-700 text-sm">
              <tr>
                {Array.from({ length: 7 }).map((_, i) => (
                  <th key={i} className="border px-4 py-2">
                    <div className="h-3.5 bg-gray-300 rounded w-full max-w-[80px] mx-auto" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 6 }).map((_, rowIdx) => (
                <tr key={rowIdx} className="text-sm text-gray-800">
                  {Array.from({ length: 7 }).map((_, colIdx) => (
                    <td key={colIdx} className="border px-4 py-3">
                      <div className="h-3.5 bg-gray-200 rounded w-full max-w-[90px] mx-auto" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardLoader;
