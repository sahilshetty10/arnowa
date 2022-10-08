import React from "react";

const navbar = ({ name }: any) => {
  return (
    <div className="m-8 flex justify-between">
      <h1 className="text-3xl font-bold text-indigo-600">Hello {name}</h1>
      <button className="btn2">Logout</button>
    </div>
  );
};

export default navbar;
