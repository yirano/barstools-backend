const express = require('express');
const axios = require('axios');
const Game = require('../models/Game');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const nba_url = "https://chumley.barstoolsports.com/dev/data/games/6c974274-4bfc-4af8-a9c4-8b926637ba74.json";
    const game = await Game.findOne({ _id: 'nba' });
    if (game && new Date() - game.lastUpdated < 15000) {
      return res.json(game.gameData);
    }
    const response = await axios.get(nba_url);
    if (game) {
      game.gameData = response.data;
      game.lastUpdated = new Date();
      await game.save();
    } else {
      await Game.create({
        _id: 'nba',
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
