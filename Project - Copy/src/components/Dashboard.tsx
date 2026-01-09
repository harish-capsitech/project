import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
const Dashboard = () => {
  const [user, setUser] = useState({ fullName: "", email: "" });
  useEffect(() => {
    const getUserData = async () => {
      const response = await fetch("http://localhost:3300/users", {
        credentials: "include",
      });

      const data = await response.json();

      if (data.success) {
        setUser({
          fullName: data.result.fullName,
          email: data.result.email
        });
      }
    };

    getUserData();
  }, []);

  return (
    <main>
      <div className="w-full flex justify-center h-screen items-center bg-gray-200">
        <div className="bg-white p-8 rounded shadow-md w-100 my-5 flex flex-col gap-4">
          <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
          <p><strong>Name:</strong> {user.fullName}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        <Link
          to="/login"
          className="hover:text-gray-500 py-1 rounded bg-red-400 text-gray-300 duration-300 w-20 text-center"
          onClick={() => {
            localStorage.removeItem("login");
            localStorage.setItem("loggedIn", "false");
            localStorage.removeItem("fullName");
            return <Navigate to="/login" />;
          }}
        >
          Log Out
        </Link>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
