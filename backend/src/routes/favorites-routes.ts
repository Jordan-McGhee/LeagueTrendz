const express = require('express')
import * as favoritesControllers from "../controllers/favorites-controllers"

const router = express.Router()

// /favorites

// create favorite
router.post("/user/:user_id", favoritesControllers.createFavorite)

// remove favorite
router.delete("/user/:user_id", favoritesControllers.removeFavorite)

// get all favorites
router.get("/user/:user_id", favoritesControllers.getAllFavorites)

// get favorites home page
router.get("/user/:user_id/home", favoritesControllers.getFavoritesHome)

module.exports = router