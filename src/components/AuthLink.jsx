import React from "react";
import { useAuth } from "../context/authContex";
import axiosClient from "../utils/axios";

const AuthLink = () => {
  const { user, logout } = useAuth();
  const handleLogout = async () => {
    try {
      const response = await axiosClient.post(
        `${import.meta.env.VITE_BASE_URL}auth/logout/`
      );
      logout();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-center gap-4">
      <div>
        Welcome, <span className="font-bold text-green-800">{user}</span>
      </div>
      <button
        className="border bg-zinc-500 p-2 rounded-lg text-white hover:bg-blue-500"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default AuthLink;
