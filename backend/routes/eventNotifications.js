const express = require('express');
const { EventNotification } = require('../models');
const router = express.Router();

// CREATE EventNotification
router.post('/', async (req, res) => {
  try {
    const notification = await EventNotification.create(req.body);
    res.status(201).json(notification);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ All EventNotifications
router.get('/', async (req, res) => {
  try {
    const notifications = await EventNotification.findAll();
    res.json(notifications);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ One EventNotification
router.get('/:id', async (req, res) => {
  try {
    const notification = await EventNotification.findByPk(req.params.id);
    if (notification) {
      res.json(notification);
    } else {
      res.status(404).json({ error: 'EventNotification not found' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE EventNotification
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await EventNotification.update(req.body, {
      where: { notification_id: req.params.id },
    });
    if (updated) {
      const updatedNotification = await EventNotification.findByPk(req.params.id);
      res.json(updatedNotification);
    } else {
      res.status(404).json({ error: 'EventNotification not found' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE EventNotification
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await EventNotification.destroy({
      where: { notification_id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'EventNotification not found' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
