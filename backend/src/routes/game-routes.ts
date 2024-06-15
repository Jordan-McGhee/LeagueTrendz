const express = require('express')
import * as gameControllers from "../controllers/game-controllers"

const router = express.Router()

// /nba/games

router.get("/date/:date", gameControllers.getGamesByDate)

// single game

router.get("/game_id/:game_id", gameControllers.getGameByID)

// box score
router.get("/game_id/:game_id/box-score", gameControllers.getGameBoxScore)

module.exports = router