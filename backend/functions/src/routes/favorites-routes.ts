const express = require('express')
import * as favoritesControllers from "../controllers/favorites-controllers"

const router = express.Router()

// /favorites

// create favorite
router.post("/", favoritesControllers.createFavorite)

// remove favorite
router.delete("/:favorite_id", favoritesControllers.removeFavorite)

// get all favorites
router.get("/:user_id", favoritesControllers.getAllFavorites)

module.exports = router