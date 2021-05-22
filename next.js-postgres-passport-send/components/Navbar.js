import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Navbar() {
  const router = useRouter();

  const user =
    typeof window !== "undefined" && JSON.parse(localStorage.getItem("user"));

  const handleLogout = async () => {
    await fetch("/api/logout");
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <header>
      <nav>
        <ul>
          {user ? (
            <>
              <li>
                <Link href="/">
                  <a>Home</a>
                </Link>
              </li>
              <li>
                <Link href={`/${user.email}`}>
                  <a>Profile</a>
                </Link>
              </li>
              <li>
                <Link href="/setting">
                  <a>Settings</a>
                </Link>
              </li>
              <li>
                <a role="button" onClick={handleLogout}>
                  Logout
                </a>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/signup">
                  <a>Sign up</a>
                </Link>
              </li>
              <li>
                <Link href="/login">
                  <a>Login</a>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      <style jsx>{`
        nav {
          display: flex;
          justify-content: center;
          margin: 0 auto;
          padding: 1rem 0;
        }
        ul {
          display: flex;
          list-style: none;
        }
        li {
          margin-right: 1rem;
        }
        li:first-child {
          margin-left: auto;
        }
        a {
          color: #fff;
          text-decoration: none;
          cursor: pointer;
        }
        header {
          color: #fff;
          background-color: #333;
        }
      `}</style>
    </header>
  );
}
