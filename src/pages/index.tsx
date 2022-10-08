import axios from "axios";
import Link from "next/link";
import React from "react";

const index = () => {
  return (
    <div className="grid h-screen w-screen gap-4">
      {/* delete this part */}
      <button
        onClick={async () => {
          await axios.post("/api/login", {
            name: "admin",
            email: "admin@admin.com",
            phone: 0,
          });
        }}
      >
        Fetch
      </button>
      <button
        onClick={async () => {
          await axios.post("/api/examples");
        }}
      >
        log cookies
      </button>
      {/*  */}
      <Link href="/login">
        <a className=" flex h-full w-full items-center justify-center bg-indigo-600 text-3xl font-bold text-white">
          Login
        </a>
      </Link>
      <Link href="/home">
        <a className=" flex h-full w-full items-center justify-center bg-indigo-600 text-3xl font-bold text-white">
          Home
        </a>
      </Link>
    </div>
  );
};

export default index;
