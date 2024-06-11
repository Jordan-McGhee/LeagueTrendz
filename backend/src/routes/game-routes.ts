const express = require('express')
import * as gameControllers from "../controllers/game-controllers"

const router = express.Router()

// /nba/games

router.get("/date/:date", gameControllers.getGamesByDate)

router.get("/game_id/:game_id", gameControllers.getGameByID)

module.exports = router