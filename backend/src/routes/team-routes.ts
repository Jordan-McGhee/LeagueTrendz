const express = require('express')
import * as teamControllers from "../controllers/team-controllers"

const router = express.Router()

// /nba/teams

router.get("/", teamControllers.getAllTeams)

// standings
router.get("/standings", teamControllers.getStandings)

router.get("/expanded", teamControllers.getStandingsExpanded)

router.get("/divisions", teamControllers.getStandingsDivisions)


router.get("/conference", teamControllers.getConferenceTeams)

router.get("/division", teamControllers.getDivisionTeams)

// SINGLE TEAM

// home
router.get("/:abbreviation", teamControllers.getSingleTeam)

// stats
router.get("/:team_id/stats-regular", teamControllers.getTeamStatsRegularSeason)
router.get("/:team_id/stats-playoffs", teamControllers.getTeamStatsPlayoffs)

// schedule
router.get("/:team_id/schedule-regular", teamControllers.getTeamScheduleRegularSeason)

// roster
router.get("/:team_id/roster", teamControllers.getTeamRoster)

// history
router.get("/:team_id/history", teamControllers.getTeamHistory)

module.exports = router