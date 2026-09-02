import genToken from "../config/token.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

const isProduction = process.env.NODE_ENV === "production";

const cookieOptions = {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: "/",
    sameSite: isProduction ? "none" : "lax",
    secure: isProduction
};

const sanitizeUser = (user) => {
    const userObject = user.toObject();
    delete userObject.password;
    return userObject;
};


// =========================
// SIGN UP
// =========================
export const SignUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Please fill all the fields"
            });
        }

        const existEmail = await User.findOne({ email });

        if (existEmail) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters"
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashPassword
        });

        const token = await genToken(user._id);

        res.cookie("token", token, cookieOptions);

        return res.status(201).json(sanitizeUser(user));

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: `SignUp error ${error.message}`
        });
    }
};


// =========================
// LOGIN
// =========================
export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Please fill all the fields"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Email does not exist"
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                message: "Incorrect password"
            });
        }

        const token = await genToken(user._id);

        res.cookie("token", token, cookieOptions);

        return res.status(200).json(sanitizeUser(user));

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: `Login error ${error.message}`
        });
    }
};


// =========================
// LOGOUT
// =========================
export const Logout = async (req, res) => {
    try {

        res.clearCookie("token", {
            httpOnly: true,
            path: "/",
            sameSite: isProduction ? "none" : "lax",
            secure: isProduction
        });

        return res.status(200).json({
            message: "Logout successful"
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: `Logout error ${error.message}`
        });
    }
};