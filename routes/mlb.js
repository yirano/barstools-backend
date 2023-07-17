const express = require('express');
const axios = require('axios');
const Game = require('../models/Game');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const mlb_url = "https://chumley.barstoolsports.com/dev/data/games/eed38457-db28-4658-ae4f-4d4d38e9e212.json";
    const game = await Game.findOne({ _id: 'mlb' });
    if (game && new Date() - game.lastUpdated < 15000) {
      return res.json(game.gameData);
    }
    const response = await axios.get(mlb_url);
    if (game) {
      game.gameData = response.data;
      game.lastUpdated = new Date();
      await game.save();
    } else {
      await Game.create({
        _id: 'mlb',
        gameData: response.data,
        lastUpdated: new Date()
      });
    }
    res.json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
