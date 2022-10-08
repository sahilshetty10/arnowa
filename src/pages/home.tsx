import React, { FormEvent, useState } from "react";
import DashBoard from "../components/DashBoard";
import Messages from "../components/Messages";
import NavBar from "../components/NavBar";

const home = () => {
  const name = "Sahil";
  const [msg, setMsg] = useState("");
  const [msgs, setMsgs] = useState<string[]>([]);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (msg.trim() !== "") {
      setMsgs([msg, ...msgs]);
      setMsg("");
    }
  };
  return (
    <>
      <NavBar name="Sahil" />
      <div className="grid place-items-center">
        <form className="space-x-4" onSubmit={handleSubmit}>
          <input
            value={msg}
            type="text"
            onChange={(e) => setMsg(e.target.value)}
            placeholder="Enter your message"
            className="btn2"
          />
          <button type="submit" className="btn1">
            Submit
          </button>
        </form>
        <div className="my-4 h-2 w-full bg-indigo-600"></div>
        <Messages messages={msgs} />
        <div className="my-4 h-2 w-full bg-indigo-600"></div>

        <DashBoard
          session={[
            {
              login: new Date(),
              messages: ["", ""],
              user: "Sahil",
              logout: new Date(new Date().getTime() + 100000),
            },
            {
              login: new Date(),
              messages: ["", ""],
              user: "Sahil",
              logout: new Date(new Date().getTime() + 100000),
            },
            {
              login: new Date(),
              messages: ["", ""],
              user: "Sahil",
              logout: new Date(new Date().getTime() + 100000),
            },
          ]}
        />
      </div>
    </>
  );
};

export default home;
