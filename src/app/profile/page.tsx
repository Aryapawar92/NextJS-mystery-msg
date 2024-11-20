"use client";

import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

function page() {
  const router = useRouter();
  const [data, setData] = React.useState(null);

  const logout = async () => {
    try {
      await axios.post("/api/users/logout");
      toast.success("User logged out successfully");
      router.push("/login");
    } catch (error: any) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    setData(res.data.data?._id);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-black text-white">
      <h1>Profile</h1>
      <hr />
      <p>Profile Page</p>
      <h2>
        {data != null ? (
          <Link href={`/profile/${data}`}>{data}</Link>
        ) : (
          "No data found"
        )}
      </h2>
      <hr />
      <button
        onClick={getUserDetails}
        className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Get Details
      </button>
      <button
        onClick={logout}
        className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
    </div>
  );
}

export default page;
