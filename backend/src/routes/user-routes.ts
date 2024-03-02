const express = require("express")
// const * = require("../controllers/user-controllers")
import * as userControllers from "../controllers/user-controllers"

const router = express.Router()

const { signUp } = userControllers

router.post("/", signUp)

module.exports = router