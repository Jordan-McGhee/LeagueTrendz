const express = require('express')
import * as gameControllers from "../controllers/game-controllers"

const router = express.Router()

// /nba/games

router.get("/date/:date", gameControllers.getGamesByDate)

// single game
router.get("/game_id/:game_id", gameControllers.getGameByID)

// team stats
router.get("/game_id/:game_id/home_team/:home_team_id/away_team/:away_team_id", gameControllers.getTeamStats)

// box score
router.get("/game_id/:game_id/box-score", gameControllers.getGameBoxScore)

module.exports = router