import React from "react";
import AuthLink from "./AuthLink";

const Navbar = () => {
  return (
    <nav className="w-full flex p-6 justify-between">
      <h1 className="text-3xl font-extrabold bg-gradient-to-r from-red-500 to-yellow-300 bg-clip-text text-transparent">
        Todo List
      </h1>
      <div>
        <AuthLink />
      </div>
    </nav>
  );
};

export default Navbar;
