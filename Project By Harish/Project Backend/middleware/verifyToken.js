import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).send({ success: false, message: "No token" });
  }

  jwt.verify(token, "Google", (err, decoded) => {
    if (err) {
      return res.status(401).send({ success: false, message: "Unauthorized" });
    }
    req.decoded = decoded;
    next();
  });
};

