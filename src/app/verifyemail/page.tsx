"use client";

import React, { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { log } from "console";

export default function VerifyEmailPage() {
  const router = useRouter();
  const [token, setToken] = React.useState("");
  const [verified, setVerified] = React.useState(false);

  const verifyEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token }).then((res) => {
        setVerified(true);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token.length > 0) {
      verifyEmail();
    }
  }, [token]);

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">
        {verified ? "Email verified successfully" : "Verifying email..."}
      </h1>
      <p className="text-lg">{verified && <Link href="/login">Login</Link>}</p>
    </div>
  );
}
