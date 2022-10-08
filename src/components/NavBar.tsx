import axios from "axios";
import { useRouter } from "next/router";
import React from "react";

const navbar = ({ name }: any) => {
  const router = useRouter();
  const logout = async () => {
    await axios.post("/api/logout");
    router.push("/login");
  };
  return (
    <div className="m-8 flex justify-between">
      <h1 className="text-3xl font-bold text-indigo-600">Hello {name}</h1>
      <button className="btn2" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default navbar;
