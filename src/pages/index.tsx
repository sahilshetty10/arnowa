import Link from "next/link";
import React from "react";

const index = () => {
  return (
    <div className="grid h-screen w-screen gap-4">
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
