const express = require('express')
import * as playerControllers from "../controllers/player-controllers"

const router = express.Router()

// /nba/players

// ALL PLAYER ROUTES
router.get("/", playerControllers.getAllPlayers),

router.get("/leaders/:seasonType", playerControllers.getPlayerStatLeaders)

// home page
router.get("/popular", playerControllers.getPopularPlayers)

// leaders table
router.get("/leaders/table/:seasonType/:perMode/:statCategory", playerControllers.getPlayerStatLeadersTable)

// game highs
router.get("/game-highs/:seasonType", playerControllers.getGameHighLeaders)

router.get("/game-highs/box-scores/:seasonType/:statCategory", playerControllers.getGameHighBoxScoresTable)


// SINGLE PLAYER ROUTES
router.get("/:player_id", playerControllers.getSinglePlayer),

// overview
router.get("/:player_id/overview/:team_id", playerControllers.getSinglePlayerOverview)

// splits
router.get("/:player_id/splits", playerControllers.getSinglePlayerSplitsView),

// stats
router.get("/:player_id/stats", playerControllers.getSinglePlayerStatsView),

// game logs
router.get("/:player_id/gamelog", playerControllers.getSinglePlayerGameLogView)

module.exports = router