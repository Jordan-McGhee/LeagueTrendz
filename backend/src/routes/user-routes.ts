const express = require("express")
const { check } = require("express-validator")
import * as userControllers from "../controllers/user-controllers"

const router = express.Router()

router.get("/", userControllers.getAllUsers)

router.post("/signUp",
    [
        check("email").normalizeEmail().isEmail(),
        check("password").isLength({ min: 6 })
    ], userControllers.signUp)

router.post("/login", userControllers.login)

router.post("/checkUsername", userControllers.getUserIDByUsername)

router.patch("/changePassword",
    [
        check("new_password").isLength({min: 6})
    ], userControllers.changePassword)

module.exports = router