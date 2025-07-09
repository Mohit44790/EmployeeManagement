import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const UpdateModal = ({ empId, onClose, onSuccess }) => {
  const [remarks, setRemarks] = useState("");
  const [locationImage, setLocationImage] = useState(null);
  const [classroomPhoto, setClassroomPhoto] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const token = localStorage.getItem("token");

  const handleSubmit = async () => {
    if (!remarks) {
      toast.error("Remarks is required");
      return;
    }

    if (!locationImage || !classroomPhoto) {
      toast.error("Please upload all images");
      return;
    }

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
            <label className="text-sm font-medium text-gray-700">
              Remarks
              <span className="text-red-500"> *</span>
            </label>
            <input
              type="text"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-blue-500 focus:outline-none"
              placeholder="Enter remarks"
            />
          </div>

          {/* LOCATION */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Location Image <span className="text-red-500">*</span>
            </label>

            <div className="relative">
              <input
                type="file"
                id="locationImageInput"
                accept="image/*"
                onChange={(e) => setLocationImage(e.target.files[0])}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <label
                htmlFor="locationImageInput"
                className="inline-block w-full text-center bg-blue-50 text-blue-700 border border-blue-300 rounded-md py-2 px-4 cursor-pointer hover:bg-blue-100 transition-all"
              >
                {locationImage ? "Change File" : "Upload File"}
              </label>
            </div>

            {locationImage && (
              <p className="text-sm text-gray-600 truncate">
                Selected:{" "}
                <span className="font-medium">{locationImage.name}</span>
              </p>
            )}
          </div>

          {/* CLASSROOM */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Classroom Photo <span className="text-red-500">*</span>
            </label>

            <div className="relative">
              <input
                type="file"
                id="classroomPhotoInput"
                accept="image/*"
                onChange={(e) => setClassroomPhoto(e.target.files[0])}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <label
                htmlFor="classroomPhotoInput"
                className="inline-block w-full text-center bg-blue-50 text-blue-700 border border-blue-300 rounded-md py-2 px-4 cursor-pointer hover:bg-blue-100 transition-all"
              >
                {classroomPhoto ? "Change File" : "Upload File"}
              </label>
            </div>

            {classroomPhoto && (
              <p className="text-sm text-gray-600 truncate">
                Selected:{" "}
                <span className="font-medium">{classroomPhoto.name}</span>
              </p>
            )}
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
              submitting
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
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
