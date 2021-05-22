import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import PrivateRoute from "../components/privateRoute";

const Profile = () => {
  const { query } = useRouter();
  const { username } = query;
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetcher = async () => {
      try {
        const res = await axios.get(`/api/${username}`, {
          headers: { "Content-Type": "application/json" },
        });
        setUser(res.data);
      } catch (error) {
        console.log(errr);
      }
    };
    if (username) {
      fetcher();
    }
  }, [username]);

  return (
    <PrivateRoute>
      <div>
        <label>id:</label>
        <p>{user?.id}</p>
        <br />
        <label>Name:</label>
        <p>{user?.name}</p>
        <br />
        <label>Email:</label>
        <p>{user?.email}</p>
      </div>
    </PrivateRoute>
  );
};

export default Profile;
