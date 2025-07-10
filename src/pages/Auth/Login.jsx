import { useEffect, useState } from "react";
import dseuLogo from "../../assets/logo/DSEULOGO.svg";
import { FaEye, FaRegEyeSlash, FaSpinner } from "react-icons/fa";
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../../Redux/slice/employeeSlice";

const Login = () => {
  const token = sessionStorage.getItem("token");

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
    general: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {
      username: "",
      password: "",
      general: "",
    };

    if (form.username.trim().length < 3 || form.username.trim().length > 50) {
      newErrors.username = "Username must be between 3 and 50 characters";
    }

    if (form.password.trim().length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return !newErrors.username && !newErrors.password;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      await dispatch(
        loginUser({ username: form.username, password: form.password })
      ).unwrap();

      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        general: error,
      }));
      toast.error(error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white rounded-lg p-6 shadow-lg"
      >
        <div className="flex justify-center mb-4">
          <img src={dseuLogo} alt="Logo" className="w-16 h-auto" />
        </div>

        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>

        {/* Username */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Enter your username"
            className={`w-full px-4 py-2 rounded-lg border ${
              errors.username ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">{errors.username}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 hover:text-gray-800"
            >
              {showPassword ? <FaRegEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-lg flex justify-center items-center gap-2 cursor-pointer ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } text-white font-semibold transition-colors`}
        >
          {loading ? (
            <>
              Logging in
              <FaSpinner className="animate-spin text-white text-lg" />
            </>
          ) : (
            "Login"
          )}
        </button>

        {/* General Error */}
        {errors.general && typeof errors.general === "string" && (
          <p className="text-red-500 text-center mt-4 text-sm">
            {errors.general}
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
