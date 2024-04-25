const express = require('express')
import * as playerControllers from "../controllers/player-controllers"

const router = express.Router()

// /nba/players

router.get("/", playerControllers.getAllPlayers),

router.get("/:player_id", playerControllers.getSinglePlayer),

// overview

// stats
router.get("/:player_id/stats", playerControllers.getSinglePlayerStatsView)

module.exports = router