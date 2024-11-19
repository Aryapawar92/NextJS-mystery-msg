"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

function page() {
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const onSignIn = async () => {};

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col bg-black">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Sign In</h1>

          <input
            id="email"
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />

          <input
            id="password"
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />

          <button
            onClick={onSignIn}
            type="submit"
            className="w-full text-center py-3 rounded bg-black text-white hover:bg-green-dark focus:outline-none my-1"
          >
            Sign In
          </button>
        </div>

        <div className="text-white mt-6">
          Already have an account?
          <Link
            className="no-underline border-b border-blue text-white"
            href={"/signup"}
          >
            Sign Up
          </Link>
          .
        </div>
      </div>
    </div>
  );
}

export default page;
