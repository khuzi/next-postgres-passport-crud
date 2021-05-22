import nextConnect from "next-connect";
import auth from "../../middleware/auth";
import bcrypt from "bcrypt";

import pool from "../../db";

const handler = nextConnect();

handler
  .use(auth)
  .use((req, res, next) => {
    if (!req.user) {
      res.status(401).json("unauthenticated");
    } else {
      next();
    }
  })
  .put(async (req, res) => {
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
      res.status(401).json({ errors });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      pool.query(
        ` UPDATE users SET name = $1, email = $2, password = $3 WHERE email = $4`,
        [name, email, hashedPassword, req.user.email],
        (err, results) => {
          if (err) {
            throw err;
          }
          req.logIn({ email, password }, (err) => {
            if (err) throw err;
            res.status(201).json({
              user: { name, email },
            });
          });
        }
      );
    }
  });

export default handler;
