import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function SignupPage() {
  const [errorMsg, setErrorMsg] = useState(null);
  const router = useRouter();

  async function onSubmit(e) {
    e.preventDefault();

    const body = {
      name: e.currentTarget.name.value,
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    };

    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.status === 201) {
      const data = await res.json();
      localStorage.setItem("user", JSON.stringify(data.user));
      router.push("/");
    } else {
      const { errors } = await res.json();
      setErrorMsg([...errors]);
      setTimeout(() => {
        setErrorMsg(null);
      }, 1500);
    }
  }

  return (
    <>
      <h1>Sign up</h1>
      {errorMsg?.map((err, i) => (
        <p key={i} className="error">
          {err.message}
        </p>
      ))}
      <div className="form-container">
        <form onSubmit={onSubmit}>
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
            <button type="submit">Sign up</button>
            <Link href="/login">
              <a>I already have an account</a>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
