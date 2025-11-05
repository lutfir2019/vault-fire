import { Link } from "react-router-dom"; // If you're using React Router for navigation

const PageNotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center px-6 py-8 bg-white rounded-lg shadow-xl max-w-lg w-full">
        <h1 className="text-6xl font-extrabold text-red-500">404</h1>
        <p className="mt-4 text-lg text-gray-600">
          Sorry, the page you are looking for does not exist.
        </p>
        <p className="mt-4 text-md text-gray-500">
          You can go back to{" "}
          <Link
            to="/"
            className="text-blue-500 hover:text-blue-700 font-semibold"
          >
            Home
          </Link>
        </p>
      </div>
    </div>
  );
};

export default PageNotFound;
