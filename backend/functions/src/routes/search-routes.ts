const express = require('express')
import * as searchControllers from "../controllers/search-controllers"

const router = express.Router()

// /search

// search results
router.get("/:term", searchControllers.searchForTerm)

module.exports = router