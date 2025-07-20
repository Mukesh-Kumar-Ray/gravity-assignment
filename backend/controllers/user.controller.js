import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";
import { generateTokenAndCookies } from "../jwt/token.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;
   //console.log(req.body)
  try {
    const userExists = await User.findOne({ email });

    if (userExists){
        return res.status(400).json({ message: "User already exists" });
    }
      
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    generateTokenAndCookies(user, res);
    res.status(201).json({ message: "User registered", user: { id: user._id, name, email } });
  } catch (err) {
    res.status(500).json({ message: "Registration failed", error: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch){
        return res.status(401).json({ message: "Invalid credentials" });
    } 

    generateTokenAndCookies(user, res);
    res.status(200).json({ message: "Login successful", user: { id: user._id, name: user.name, email } });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

export const getProfile = async (req, res) => {
  res.status(200).json({ user: req.user });
};
