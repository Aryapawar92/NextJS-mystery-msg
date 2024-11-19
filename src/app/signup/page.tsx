"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

function page() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    username: "",
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  const onSignup = async () => {
    try {
      await axios.post("/api/users/signup", user).then((res) => {
        toast.success("User created successfully");
        router.push("/login");
      });
    } catch (error: any) {
      console.log(error);

      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (
      user.username.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [user]);

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col bg-black">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Sign up</h1>
          <input
            id="username"
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            value={user.username}
            placeholder="Username"
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />

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
            onClick={onSignup}
            type="submit"
            className="w-full text-center py-3 rounded bg-black text-white hover:bg-green-dark focus:outline-none my-1"
          >
            {buttonDisabled ? "Sign Up" : "Cant Sign Up"}
          </button>
        </div>

        <div className="text-white mt-6">
          Already have an account?
          <Link
            className="no-underline border-b border-blue text-white"
            href={"/login"}
          ></Link>
          Log in Now
        </div>
      </div>
    </div>
  );
}

export default page;
