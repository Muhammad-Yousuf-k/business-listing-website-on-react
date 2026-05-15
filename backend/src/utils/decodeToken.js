import jwt from "jsonwebtoken";

const decodeToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

export default decodeToken;