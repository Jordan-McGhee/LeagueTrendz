const express = require('express')
import * as playerControllers from "../controllers/player-controllers"

const router = express.Router()

router.get("/", playerControllers.getAllPlayers),

router.get("/:player_id", playerControllers.getSinglePlayer)

module.exports = router