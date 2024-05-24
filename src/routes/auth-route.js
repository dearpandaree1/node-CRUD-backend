const express = require("express");
const authController = require("../controller/auth-controller");
const router = express.Router();
const authenticateMiddleware = require("../middleware/authenticate");

router.get("/username", authController.getGenerateUsername);
router.post("/register", authController.register);
router.get("/login", authController.login);
router.get("/me", authenticateMiddleware, authController.getMe);

module.exports = router;
