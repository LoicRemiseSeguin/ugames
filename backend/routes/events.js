const express = require('express');
const { Event } = require('../models');
const { Op } = require('sequelize');
const { Game } = require('../models');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const events = await Event.findAll();
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/upcoming', async (req, res) => {
  try {
    const { city, date, max_time } = req.query;
    const whereConditions = {
      event_date: {
        [Op.gt]: new Date()
      }
    };
    if (city) {
      whereConditions.city = city;
    }
    if (date) {
      whereConditions.event_date = {
        [Op.eq]: new Date(date)
      };
    }
    if (max_time) {
      whereConditions.game_id = {
        [Op.in]: await getGamesWithinTime(max_time)
      };
    }
    const filteredEvents = await Event.findAll({
      where: whereConditions
    });
    res.json(filteredEvents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

async function getGamesWithinTime(maxTime) {
  const games = await Game.findAll({
    attributes: ['game_id'],
    where: {
      average_playtime: { [Op.lte]: maxTime }
    }
  });
  return games.map(game => game.game_id);
}

router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ error: 'Event not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Event.update(req.body, {
      where: { event_id: req.params.id },
    });
    if (updated) {
      const updatedEvent = await Event.findByPk(req.params.id);
      res.json(updatedEvent);
    } else {
      res.status(404).json({ error: 'Event not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Event.destroy({
      where: { event_id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Event not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
