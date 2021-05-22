import nextConnect from "next-connect";
import auth from "../../middleware/auth";

import bcrypt from "bcrypt";
import pool from "../../db";

const handler = nextConnect();

handler.use(auth).post(async (req, res) => {
  const { name, email, password } = req.body;
  const errors = [];

  if (!name || !email || !password) {
    errors.push({ message: "Please enter all fields" });
  }

  if (name.length < 3) {
    errors.push({
      message: "Username must greater than 3  characters",
    });
  }

  if (name.length > 20) {
    errors.push({
      message: "Username must less than 20  characters",
    });
  }

  if (password.length < 6) {
    errors.push({ message: "Password should be atleast 6 characters" });
  }

  if (errors.length > 0) {
    res.status(401).json({ errors: errors });
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    pool.query(
      `SELECT * FROM users
              WHERE email = $1`,
      [email],
      (err, results) => {
        if (err) {
          throw err;
        }
        if (results.rows.length > 0) {
          errors.push({ message: "User already exists" });
          res.status(403).json({ errors: errors });
        } else {
          pool.query(
            `INSERT INTO users (name , email, password)
                       VALUES ($1, $2, $3)
                       RETURNING id, password`,
            [name, email, hashedPassword],
            (err, results) => {
              if (err) {
                throw err;
              }
              req.logIn({ email, password }, (err) => {
                if (err) throw err;
                // Log the signed up user in
                res.status(201).json({
                  user: { name, email },
                });
              });
            }
          );
        }
      }
    );
  }
});

export default handler;
