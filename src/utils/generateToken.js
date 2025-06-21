import jwt from "jsonwebtoken";

export default function generateToken(id, role) {
  return jwt.sign(
    { id: id, role: role},
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );
};
