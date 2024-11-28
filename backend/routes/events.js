const express = require('express');
const { Op } = require('sequelize');
const { Event, Game } = require('../models');
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
    const { city, date, game_name } = req.query;
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
    const queryOptions = {
      where: whereConditions,
      include: []
    };
    if (game_name) {
      queryOptions.include.push({
        model: Game,
        where: { name: game_name },
        required: true,
        attributes: []
      });
    }
    const filteredEvents = await Event.findAll(queryOptions);
    res.json(filteredEvents);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

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
