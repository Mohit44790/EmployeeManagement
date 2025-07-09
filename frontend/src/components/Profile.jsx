import { useEffect, useState } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "../Redux/constants/backendapi";
import Loader from "./Loader";
import { profileHolder } from "../assets/logo";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear("token");
    toast.success("User Logged out successfully!")
    navigate("/");
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${USER_API_END_POINT}/admin/get-profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProfile(response.data);
    };

    fetchProfile();
  }, []);

  if (!profile) {
    return <Loader />;
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toISOString().split("T")[0];
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-[#333] bg-white p-3 pl-5 rounded-2xl shadow-md">
        Profile
      </h1>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Card */}
        <div
          className="bg-white rounded-2xl shadow-md p-6 w-full md:w-1/3 text-center
        flex flex-col justify-between "
        >
          <div className="mt-6">
            <div className="rounded-t-2xl bg-blue-500 h-20 -mt-6 mb-4" />
            <div className="-mt-16 mb-2 flex justify-center">
              <img
                src={profile.profile_photo || profileHolder}
                alt={profile.name}
                className="w-24 h-24 rounded-full border-4 border-white object-cover"
              />
            </div>
            <h2 className="text-lg font-semibold">{profile.name}</h2>
            <p className="text-gray-500 mt-1">
              {profile.designation || "Designation not available"}
            </p>
            <p className="text-gray-500">
              {profile.campus_name || "No Campus"}
            </p>
          </div>

          <button
            className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-600 transition cursor-pointer"
            onClick={handleLogout}
          >
            Log Out
          </button>
        </div>

        {/* Right Info Panels */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Personal Info */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-lg ml-3 font-semibold mb-5">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm">
              <div>
                <span className="text-gray-600">Name</span>
                <p className="text-base font-medium text-gray-800">
                  {profile.name}
                </p>
              </div>
              <div>
                <span className="text-gray-600">Gender</span>
                <p className="text-base font-medium text-gray-800">—</p>
              </div>
              <div>
                <span className="text-gray-600">Email</span>
                <p className="text-base font-medium text-gray-800">
                  {profile.email}
                </p>
              </div>
              <div>
                <span className="text-gray-600">DOB</span>
                <p className="text-base font-medium text-gray-800">
                  {formatDate(profile.dob)}
                </p>
              </div>
            </div>
          </div>

          {/* Work Info */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-lg font-semibold mb-5">Work Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm">
              <div>
                <span className="text-gray-600">Date of Joining</span>
                <p className="text-base font-medium text-gray-800">
                  {formatDate(profile.doj)}
                </p>
              </div>
              <div>
                <span className="text-gray-600">Staff Type</span>
                <p className="text-base font-medium text-gray-800">—</p>
              </div>
              <div>
                <span className="text-gray-600">Campus</span>
                <p className="text-base font-medium text-gray-800">
                  {profile.campus_name}
                </p>
              </div>
              <div>
                <span className="text-gray-600">Designation</span>
                <p className="text-base font-medium text-gray-800">
                  {profile.designation}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
