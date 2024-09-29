const express = require('express');
const { Game } = require('../models');
const router = express.Router();

// CREATE Game
router.post('/', async (req, res) => {
  try {
    const game = await Game.create(req.body);
    res.status(201).json(game);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ All Games
router.get('/', async (req, res) => {
  try {
    const games = await Game.findAll();
    res.json(games);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ One Game
router.get('/:id', async (req, res) => {
  try {
    const game = await Game.findByPk(req.params.id);
    if (game) {
      res.json(game);
    } else {
      res.status(404).json({ error: 'Game not found' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE Game
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Game.update(req.body, {
      where: { game_id: req.params.id },
    });
    if (updated) {
      const updatedGame = await Game.findByPk(req.params.id);
      res.json(updatedGame);
    } else {
      res.status(404).json({ error: 'Game not found' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE Game
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Game.destroy({
      where: { game_id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Game not found' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
