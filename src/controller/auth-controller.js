const prisma = require("../model/prisma");
const { all } = require("../routes/address-route");
const { registerSchema, loginSchema } = require("../validators/auth-validator");
const creatError = require("../utils/create-error");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const e = require("express");

// Function to generate a random username suffix
function randomUsername(username) {
    return username + Math.floor(Math.random() * 10);
}
function cutUsername(email) {
    let i = 0;
    let username = "";
    for (i = 0; i < email.length; i++) {
        if (email[i] === "@") {
            break;
        }
        username += email[i];
    }
    return username;
}

exports.getGenerateUsername = async (req, res, next) => {
    try {
        console.log(req.body);
        const username = cutUsername(req.body.email);
        const requestedUsername = username;
        console.log("requestedUsername : ", username);
        let suggestedUsername;
        // let selectedUsername;
        // Check if the requested username is already in use
        const existingUser = await prisma.user.findUnique({
            where: {
                username: requestedUsername,
            },
        });
        console.log("existingUser: ", existingUser);

        if (existingUser) {
            let existingSuggestedUsername;

            // Generate a unique username
            do {
                suggestedUsername = randomUsername(requestedUsername);
                existingSuggestedUsername = await prisma.user.findUnique({
                    where: {
                        username: suggestedUsername,
                    },
                });
                console.log("random");
            } while (existingSuggestedUsername);
            console.log(
                "This username is already in use, please choose this username instead : ",
                suggestedUsername
            );

            return res.status(200).json({
                msg: "This username is already in use, please choose this username instead : ",
                suggestedUsername,
            });
        }

        // Username is available
        suggestedUsername = requestedUsername;
        console.log("This username is still available: ", requestedUsername);
        res.status(200).json({
            msg: "This username is still available: ",
            suggestedUsername,
        });
    } catch (err) {
        console.log(err);
        next(err);
    }
};

exports.register = async (req, res, next) => {
    try {
        console.log(req.body.registerInputObject);
        // check schema
        const { value, error } = registerSchema.validate(req.body);
        if (error) {
            return next(creatError(error));
        }

        // check email duplicate
        const emailDup = await prisma.user.findUnique({
            where: {
                email: value.email,
            },
        });
        if (emailDup) {
            return next(creatError("This email is already use", 400));
        }

        // check username duplicate
        const usernameDup = await prisma.user.findUnique({
            where: {
                username: value.username,
            },
        });

        if (usernameDup) {
            return next(creatError("This username is already use", 400));
        }

        // hash password
        value.password = await bcrypt.hash(value.password, 12);

        // create user in database
        const user = await prisma.user.create({
            data: value,
        });

        // create accessToken
        const payload = { userId: user.id };
        const accessToken = jwt.sign(
            payload,
            process.env.JWT_SECRET_KEY || "aqwydlsavdnviowhuqbdpqmzpeybc",
            {
                expiresIn: process.env.JWT_EXPIRE,
            }
        );

        delete user.password;
        delete user.isAdmin;
        delete user.email;
        console.log(
            "create user successfully: accessToken and user",
            accessToken,
            user
        );
        res.status(201).json({
            msg: "create user successfully:",
            accessToken,
            user,
        });
    } catch (error) {
        console.log(err);
        next(err);
    }
};

exports.login = async (req, res, next) => {
    try {
        console.log("req.body : ", req.body);
        const { value, error } = loginSchema.validate(req.body);
        if (error) {
            return next(error);
        }
        console.log(value);
        // check username in database
        const user = await prisma.user.findFirst({
            where: {
                username: value.username,
            },
        });
        if (!user) {
            return next(creatError("incorrect username or password", 400));
        }
        const isMatch = await bcrypt.compare(value.password, user.password);
        if (!isMatch) {
            return next(creatError("incorrect username or password", 400));
        }
        // create accesstoken
        const payload = { userId: user.id };
        const accessToken = jwt.sign(
            payload,
            process.env.JWT_SECRET_KEY || "dfwueyqiuhdjkbsajkbd",
            {
                expiresIn: process.env.JWT_EXPIRE,
            }
        );
        delete user.password;
        delete user.isAdmin;
        delete user.email;
        console.log("You can login", accessToken, user);
        res.status(200).json({ accessToken, user });
    } catch (err) {
        console.log(err);
        next(err);
    }
};

exports.getMe = (req, res) => {
    delete req.user.isAdmin;
    delete req.user.email;
    console.log("req.user", req.user);
    res.status(200).json({ user: req.user });
};
