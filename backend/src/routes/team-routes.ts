const express = require('express')
import * as teamControllers from "../controllers/team-controllers"

const router = express.Router()

// /nba/teams

router.get("/", teamControllers.getAllTeams),

router.get("/conference", teamControllers.getConferenceTeams)

router.get("/division", teamControllers.getDivisionTeams)

// SINGLE TEAM

// home
router.get("/:abbreviation", teamControllers.getSingleTeam)

// stats
router.get("/:team_id/stats-regular", teamControllers.getTeamStatsRegularSeason)

// schedule
router.get("/:team_id/schedule-regular", teamControllers.getTeamScheduleRegularSeason)

// roster
router.get("/:team_id/roster", teamControllers.getTeamRoster)

// history
router.get("/:team_id/history", teamControllers.getTeamHistory)

module.exports = router