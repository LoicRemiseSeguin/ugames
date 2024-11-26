const express = require('express');
const { UserStatistic } = require('../models');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const stat = await UserStatistic.create(req.body);
    res.status(201).json(stat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const stats = await UserStatistic.findAll();
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:user_id/:game_id', async (req, res) => {
  try {
    const stat = await UserStatistic.findOne({
      where: {
        user_id: req.params.user_id,
        game_id: req.params.game_id,
      },
    });
    if (stat) {
      res.json(stat);
    } else {
      res.status(404).json({ error: 'UserStatistic not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:user_id/:game_id', async (req, res) => {
  try {
    const [updated] = await UserStatistic.update(req.body, {
      where: {
        user_id: req.params.user_id,
        game_id: req.params.game_id,
      },
    });
    if (updated) {
      const updatedStat = await UserStatistic.findOne({
        where: {
          user_id: req.params.user_id,
          game_id: req.params.game_id,
        },
      });
      res.json(updatedStat);
    } else {
      res.status(404).json({ error: 'UserStatistic not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:user_id/:game_id', async (req, res) => {
  try {
    const deleted = await UserStatistic.destroy({
      where: {
        user_id: req.params.user_id,
        game_id: req.params.game_id,
      },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'UserStatistic not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
