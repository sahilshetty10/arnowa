import axios from "axios";
import { verify } from "jsonwebtoken";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";
import { prisma } from "../server/db/client";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { token } = context.req.cookies;
  if (token) {
    try {
      verify(token, process.env.JWT_SECRET!);
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    } catch (e) {
      return {
        props: {},
      };
    }
  }
  return {
    props: {},
  };
};

const login = () => {
  const router = useRouter();
  const [isUser, setIsUser] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isUser) {
      let response = await axios.post("/api/login", {
        name: name,
        email: email,
        phone: phone,
      });
      window.alert(response.data.message);
      response.data.message === "logged in" && router.push("/home");
    } else {
      // code for resgistering new user
      let response = await axios.post("/api/register", {
        name: name,
        email: email,
        phone: phone,
      });
      window.alert(response.data.message);
    }
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
