const express = require('express');
const { EventParticipant } = require('../models');
const router = express.Router();

// CREATE EventParticipant
router.post('/', async (req, res) => {
  try {
    const eventParticipant = await EventParticipant.create(req.body);
    res.status(201).json(eventParticipant);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ All EventParticipants
router.get('/', async (req, res) => {
  try {
    const participants = await EventParticipant.findAll();
    res.json(participants);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ One EventParticipant
router.get('/:user_id/:event_id', async (req, res) => {
  try {
    const participant = await EventParticipant.findOne({
      where: {
        user_id: req.params.user_id,
        event_id: req.params.event_id,
      },
    });
    if (participant) {
      res.json(participant);
    } else {
      res.status(404).json({ error: 'EventParticipant not found' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE EventParticipant
router.put('/:user_id/:event_id', async (req, res) => {
  try {
    const [updated] = await EventParticipant.update(req.body, {
      where: {
        user_id: req.params.user_id,
        event_id: req.params.event_id,
      },
    });
    if (updated) {
      const updatedParticipant = await EventParticipant.findOne({
        where: {
          user_id: req.params.user_id,
          event_id: req.params.event_id,
        },
      });
      res.json(updatedParticipant);
    } else {
      res.status(404).json({ error: 'EventParticipant not found' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE EventParticipant
router.delete('/:user_id/:event_id', async (req, res) => {
  try {
    const deleted = await EventParticipant.destroy({
      where: {
        user_id: req.params.user_id,
        event_id: req.params.event_id,
      },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'EventParticipant not found' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
