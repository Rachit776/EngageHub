import User from "../models/User.js";
import jwt from "jsonwebtoken"
export async function signup(req, res) {
  const { fullName, email, password } = req.body;

  try {
    if (!email || !fullName || !password) {
      return res.status(400).json({ message: "All field are required" });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be greater than 8 characters" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const existingUser = await User.findOne({email});
    if(existingUser){
        return res.status(400).json({ message: "Email already existed" });
    }

    const idx = Math.floor(Math.random()*100) +1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

    const newUser = new User.create({
        email,
        fullName,
        password,
        profilePic: randomAvatar,
    })

    const token = jwt.sign({userId:newUser._id},process.env.JWT_SECRET_KEY,{
        expiresIN: "7d"
    })
  } catch (error) {}
}

export async function login(req, res) {
  res.send("login route");
}

export function logout(req, res) {
  res.send("logout route");
}
