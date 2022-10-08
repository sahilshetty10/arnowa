import React, { FormEvent, useState } from "react";

const login = () => {
  const [isUser, setIsUser] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setName("");
    setEmail("");
    setPhone("");
  };
  return (
    <>
      <div className="flex h-[80vh] flex-col items-center justify-center">
        <h1 className="mb-4 text-center text-3xl font-bold text-indigo-600">
          Please login
        </h1>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 place-items-center justify-center gap-4"
        >
          <label>Name: </label>
          <input
            className="btn2"
            value={name}
            type="text"
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Name"
            required
          />
          <label>Email: </label>
          <input
            className="btn2"
            value={email}
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
            required
          />
          <label>Phone: </label>
          <input
            className="btn2"
            value={phone}
            type="text"
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter Phone"
            required
          />
          <div></div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="submit"
              className="btn1"
              onClick={() => setIsUser(true)}
            >
              Login
            </button>
            <button
              type="submit"
              className="btn1"
              onClick={() => setIsUser(false)}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default login;
