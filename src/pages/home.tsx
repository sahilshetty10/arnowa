import axios from "axios";
import { decode, verify } from "jsonwebtoken";
import { GetServerSideProps } from "next";
import React, { FormEvent, useState } from "react";
import DashBoard from "../components/DashBoard";
import Messages from "../components/Messages";
import NavBar from "../components/NavBar";

interface User {
  email: string;
  name: string;
  phone: number;
  sessions: [
    {
      id: number;
      login: string;
      logout: string | null;
      messages: [{ id: number; message: string }];
      usersEmail: string;
    }
  ];
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { token } = context.req.cookies;
  if (token) {
    try {
      verify(token, process.env.JWT_SECRET!);
      const user = decode(token);
      return {
        props: { user },
      };
    } catch (e) {
      return { redirect: { destination: "/login", permanent: false } };
    }
  } else {
    return { redirect: { destination: "/login", permanent: false } };
  }
};

const home = ({ user }: { user: User }) => {
  console.log(user);
  const aggregateMsgs: string[] = [];
  user.sessions.map((s) =>
    s.messages.map((m) => aggregateMsgs.push(m.message))
  );
  const name = user.name;
  const [msg, setMsg] = useState("");
  const [msgs, setMsgs] = useState<string[]>(aggregateMsgs);
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (msg.trim() !== "") {
      let response = await axios.post("/api/messages", { msg: msg });
      console.log(response.data);
      if (response.data.message === "success") {
        setMsgs([msg, ...msgs]);
        setMsg("");
      }
    }
  };
  return (
    <>
      <NavBar name={name} />
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

        <DashBoard session={user.sessions} />
      </div>
    </>
  );
};

export default home;
