import pool from "../../db";

export default async function handler({ query: { username } }, res) {
  pool.query(
    `SELECT * FROM users WHERE email = $1`,
    [username],
    async (err, results) => {
      if (err) {
        throw err;
      }
      const user = await results.rows[0];
      res.json({
        id: user.id,
        name: user.name,
        email: user.email,
      });
    }
  );
}
