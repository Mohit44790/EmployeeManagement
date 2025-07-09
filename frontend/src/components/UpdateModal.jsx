import { useState } from "react";
import axios from "axios";

const UpdateModal = ({ empId, onClose, onSuccess }) => {
  const [remarks, setRemarks] = useState("");
  const [locationImage, setLocationImage] = useState(null);
  const [classroomPhoto, setClassroomPhoto] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const token = localStorage.getItem("token");

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const formData = new FormData();
      if (locationImage) formData.append("location_image", locationImage);
      if (classroomPhoto) formData.append("classroom_photo", classroomPhoto);

      const query = new URLSearchParams({ remarks }).toString();

      await axios.post(
        `http://68.183.6.149:8000/employee/update-employee/${empId}?${query}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onSuccess?.();
      onClose();
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-[90%] sm:w-full max-w-md rounded-xl p-6 shadow-lg relative">
        <h2 className="text-lg font-semibold mb-4">Update Employee</h2>

        <div className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Remarks</label>
            <input
              type="text"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-blue-500 focus:outline-none"
              placeholder="Enter remarks"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Location Image
            </label>
            <input
              type="file"
              onChange={(e) => setLocationImage(e.target.files[0])}
              className="w-full mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Classroom Photo
            </label>
            <input
              type="file"
              onChange={(e) => setClassroomPhoto(e.target.files[0])}
              className="w-full mt-1"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            disabled={submitting}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={submitting}
            className={`px-4 py-2 rounded text-white flex items-center justify-center gap-2 cursor-pointer ${
              submitting ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {submitting ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;
