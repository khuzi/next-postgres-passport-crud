import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import PrivateRoute from "../components/privateRoute";

function ProfileEdit() {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState(null);

  async function handleEditProfile(e) {
    e.preventDefault();

    const body = {
      name: e.currentTarget.name.value,
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    };
    const res = await fetch("/api/user", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.status === 201) {
      localStorage.setItem("user", JSON.stringify(res.data.user));
      router.push("/");
    } else {
      const { errors } = await res.json();
      console.log(errors);
      setErrorMsg([...errors]);
      setTimeout(() => {
        setErrorMsg(null);
      }, 2000);
    }
  }

  return (
    <PrivateRoute>
      <h1>Edit Profile</h1>
      <div className="form-container">
        {errorMsg?.map((err, i) => (
          <p key={i} className="error">
            {err.message}
          </p>
        ))}
        <form onSubmit={handleEditProfile}>
          <label>
            <span>Name</span>
            <input type="text" name="name" required />
          </label>
          <label>
            <span>Email</span>
            <input type="email" name="email" required />
          </label>
          <label>
            <span>Password</span>
            <input type="password" name="password" required />
          </label>
          <div className="submit">
            <button type="submit">Update profile</button>
          </div>
        </form>
      </div>
      <style jsx>{`
        .delete {
          color: #f44336;
          cursor: pointer;
        }
        .delete:hover {
          color: #b71c1c;
        }
      `}</style>
    </PrivateRoute>
  );
}

export default function ProfilePage() {
  return (
    <>
      <ProfileEdit />
      <style jsx>{`
        pre {
          white-space: pre-wrap;
          word-wrap: break-word;
        }
      `}</style>
    </>
  );
}
