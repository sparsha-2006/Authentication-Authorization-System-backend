const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// REGISTER
exports.register = async (req, res) => {
    try {

        const { name, email, password, role } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });

        res.status(201).json({
            message: "User Registered",
            user
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};



// LOGIN
exports.login = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid Credentials"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid Credentials"
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.json({
            message: "Login Successful",
            token
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};



// GET PROFILE
exports.getProfile = async (req, res) => {

    const user = await User.findById(req.user.id).select("-password");

    res.json(user);
};



// UPDATE PROFILE
exports.updateProfile = async (req, res) => {

    const user = await User.findById(req.user.id);

    user.name = req.body.name || user.name;

    await user.save();

    res.json({
        message: "Profile Updated",
        user
    });
};



// ADMIN - GET ALL USERS
exports.getUsers = async (req, res) => {

    const users = await User.find().select("-password");

    res.json(users);
};



// ADMIN - DELETE USER
exports.deleteUser = async (req, res) => {

    await User.findByIdAndDelete(req.params.id);

    res.json({
        message: "User Deleted"
    });
};