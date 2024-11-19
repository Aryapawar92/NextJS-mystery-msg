import React from "react";

function UserProfile({ params }: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-black text-white">
      <h1>Profile</h1>
      <hr />
      <p>
        Profile Page
        <span className="text-3xl p-2 rounded bg-orange-600 ml-2 text-black">
          {params.id}
        </span>
      </p>
    </div>
  );
}

export default UserProfile;
