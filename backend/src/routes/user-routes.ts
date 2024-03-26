const express = require("express")
const { check } = require("express-validator")
import * as userControllers from "../controllers/user-controllers"

const router = express.Router()

router.get("/", userControllers.getAllUsers)

router.get("/:user_id", userControllers.getUser),

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

router.patch("/:user_id/admin", userControllers.changeAdminStatus)

module.exports = router