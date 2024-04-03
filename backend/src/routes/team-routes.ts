const express = require('express')
import * as teamControllers from "../controllers/team-controllers"

const router = express.Router()

router.get("/", teamControllers.getAllTeams),

router.get("/conference", teamControllers.getConferenceTeams),

router.get("/division", teamControllers.getDivisionTeams),

router.get("/:abbreviation", teamControllers.getSingleTeam)

module.exports = router