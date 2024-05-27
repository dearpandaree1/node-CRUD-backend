const Joi = require("Joi");

const registerSchema = Joi.object({
    username: Joi.string()
        .pattern(/^[a-zA-Z0-9]{4,30}$/)
        .trim()
        .required(),
    email: Joi.string().trim().email().required(),
    password: Joi.string()
        .pattern(/^[a-zA-Z0-9]{4,30}$/)
        .trim()
        .required(),
});

const loginSchema = Joi.object({
    username: Joi.string()
        .pattern(/^[a-zA-Z0-9]{4,30}$/)
        .trim(),
    email: Joi.string().trim().email(),
    password: Joi.string()
        .pattern(/^[a-zA-Z0-9]{4,30}$/)
        .trim()
        .required(),
});

exports.registerSchema = registerSchema;
exports.loginSchema = loginSchema;
