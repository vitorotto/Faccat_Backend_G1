import jwt from "jsonwebtoken";

export default function generateToken(id) {
  return jwt.sign(
    { id: id},
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );
};
