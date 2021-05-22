import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  //password: ""           if you have
  port: 5432,
  database: "usersmanagement",
});

export default pool;
