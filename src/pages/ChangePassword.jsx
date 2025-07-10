import { useState } from "react";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import withAuthProtection from "../components/withAuthProtection";
import { Navbar } from "../components";

// const resetPassword = async () => {
//   try {

//   } catch (error) {
//     console.error(error?.message || error);
//   }
// };

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("New password must be at least 8 characters long.");
      return;
    }

    try {
      setLoading(true);

      toast.success("Password changed successfully.");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to change password.");
    } finally {
      setLoading(false);
    }
  };

  const renderInput = (label, value, onChange, show, setShow) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          autoComplete="new-password"
          className="w-full border border-gray-300 p-2 rounded-lg pr-10 focus:outline-none focus:ring focus:ring-blue-200"
          required
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
        >
          {show ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
    </div>
  );

  return (
    <main className="flex items-center justify-center min-h-screen w-full">
      <Navbar />
      <div className="w-[90%] sm:w-[70%] md:w-[50%] lg:w-[30%] mx-auto p-6 bg-white shadow-md rounded-4xl">
        <h2 className="text-xl font-semibold mb-4">Change Password</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {renderInput(
            "Old Password",
            oldPassword,
            (e) => setOldPassword(e.target.value),
            showOld,
            setShowOld
          )}
          {renderInput(
            "New Password",
            newPassword,
            (e) => setNewPassword(e.target.value),
            showNew,
            setShowNew
          )}
          {renderInput(
            "Confirm New Password",
            confirmPassword,
            (e) => setConfirmPassword(e.target.value),
            showConfirm,
            setShowConfirm
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-full transition duration-200"
            disabled={loading}
          >
            {loading ? "Changing..." : "Change Password"}
          </button>
        </form>
      </div>
    </main>
  );
};

const ProtectedProfile = withAuthProtection(ChangePassword);
export default ProtectedProfile;
