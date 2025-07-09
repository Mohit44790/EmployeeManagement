/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const withAuthProtection = (WrappedComponent) => {
  return (props) => {
    const navigate = useNavigate();
    const [checkingAuth, setCheckingAuth] = useState(true);

    useEffect(() => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/");
        toast.error("You are not logged in!")
      } else {
        setCheckingAuth(false);
      }
    }, [navigate]);

    if (checkingAuth) {
      return (
        <div className="min-h-fit flex items-center justify-center text-white">
          Loading...
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuthProtection;
