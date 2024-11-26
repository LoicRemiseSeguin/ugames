const express = require('express');
const { Friend } = require('../models');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const friend = await Friend.create(req.body);
    res.status(201).json(friend);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const friends = await Friend.findAll();
    res.json(friends);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:user_id1/:user_id2', async (req, res) => {
  try {
    const friend = await Friend.findOne({
      where: {
        user_id1: req.params.user_id1,
        user_id2: req.params.user_id2,
      },
    });
    if (friend) {
      res.json(friend);
    } else {
      res.status(404).json({ error: 'Friendship not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:user_id1/:user_id2', async (req, res) => {
  try {
    const [updated] = await Friend.update(req.body, {
      where: {
        user_id1: req.params.user_id1,
        user_id2: req.params.user_id2,
      },
    });
    if (updated) {
      const updatedFriend = await Friend.findOne({
        where: {
          user_id1: req.params.user_id1,
          user_id2: req.params.user_id2,
        },
      });
      res.json(updatedFriend);
    } else {
      res.status(404).json({ error: 'Friendship not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:user_id1/:user_id2', async (req, res) => {
  try {
    const deleted = await Friend.destroy({
      where: {
        user_id1: req.params.user_id1,
        user_id2: req.params.user_id2,
      },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Friendship not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
