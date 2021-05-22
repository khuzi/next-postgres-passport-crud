import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function LoginPage() {
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const user =
    typeof window !== "undefined" && JSON.parse(localStorage.getItem("user"));

  async function onSubmit(e) {
    e.preventDefault();

    const body = {
      username: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    };
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.status === 200) {
      const userObj = await res.json();
      localStorage.setItem("user", JSON.stringify(userObj.user));
      router.push("/");
    } else {
      setErrorMsg("Incorrect username or password. Try better!");
    }
  }

  if (user) {
    useEffect(() => {
      router.push("/");
    }, []);
    return null;
  }

  return (
    <>
      <h1>Login</h1>
      {errorMsg && <p className="error">{errorMsg}</p>}
      <div className="form-container">
        <form onSubmit={onSubmit}>
          <label>
            <span>Email</span>
            <input type="email" name="email" required />
          </label>
          <label>
            <span>Password</span>
            <input type="password" name="password" required />
          </label>
          <div className="submit">
            <button type="submit">Login</button>
            <Link href="/signup">
              <a>I don't have an account</a>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
