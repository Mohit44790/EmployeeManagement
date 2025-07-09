import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100  p-6">
      <h1 className="text-7xl font-extrabold mb-4">404</h1>
      <p className="text-2xl mb-6">Oops! Page not found.</p>
      <div className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-md font-semibold transition hover:cursor-pointer"
        onClick={() => navigate(-1)}
      >
        Go Back
      </div>
    </div>
  );
};

export default NotFoundPage;
