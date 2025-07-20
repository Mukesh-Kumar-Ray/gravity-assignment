import jwt from "jsonwebtoken";

export const generateTokenAndCookies = (user, res) => {
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
  });

  return token;
};
