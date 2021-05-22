import React, { useEffect } from "react";
import { useRouter } from "next/router";

const PrivateRoute = ({ children }) => {
  const router = useRouter();
  const user =
    typeof window !== "undefined" && JSON.parse(localStorage.getItem("user"));
  if (!user) {
    useEffect(() => {
      router.push("/login");
    }, []);
    return null;
  }
  return children;
};

export default PrivateRoute;
