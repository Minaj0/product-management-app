const User = require('../model/user.model');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({
                error: "All fields are required"
            });
        }

        const existingUser = await User.findOne({
            $or: [{ username }, { email }]
        });

        if (existingUser) {
            return res.status(409).json({
                error: "Username or email already exist"
            });
        }

        const hashed = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            username,
            email,
            password: hashed
        });

        res.status(201).json({
            Message: "Registration Done",
            Details: {
                username: newUser.username,
                email: newUser.email,
            }
        });

    } catch (error) {
        return res.status(500).json(error.message);
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json("Both username/email & password are required");
        }

        console.log('Login attempt for:', username); // Debug log

        const isEmail = username.includes('@');
        const searchTearm = username.toLowerCase();

        const user = await User.findOne({
            $or: [
                { email: isEmail ? searchTearm : undefined },
                { username: !isEmail ? searchTearm : undefined }
            ]
        }).select('+password');



        if (!user) {
            return res.status(401).json({
                error: "Invalid credentials"
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json("Invalid password");
        }
        res.json({
            Message: `Welcome back ${user.username}`
        })
    } catch (error) {
        res.status(500).json(error.message);
    }
};