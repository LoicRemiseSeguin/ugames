const express = require('express');
const { User, EventParticipant } = require('../models');
const authenticate = require('../middlewares/auth');
const { checkAdmin, checkAdminOrSelf } = require('../middlewares/permissions');
const router = express.Router();
const bcrypt = require('bcrypt');
const SECRET_KEY = 'boardgame';
const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', authenticate, checkAdmin, async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', authenticate, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'Utilisateur non trouvé' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', authenticate, checkAdminOrSelf, async (req, res) => {
  try {
    const [updated] = await User.update(req.body, {
      where: { user_id: req.params.id }
    });
    if (updated) {
      const updatedUser = await User.findByPk(req.params.id);
      res.json(updatedUser);
    } else {
      res.status(404).json({ error: 'Utilisateur non trouvé' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', authenticate, checkAdminOrSelf, async (req, res) => {
  try {
    const deleted = await User.destroy({
      where: { user_id: req.params.id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Utilisateur non trouvé' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id/events', authenticate, checkAdminOrSelf, async (req, res) => {
  try {
    const events = await EventParticipant.findAll({
      where: { user_id: req.params.id },
      attributes: ['event_id'],
    });
    const eventIds = events.map(event => event.event_id);
    res.json(eventIds);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }
    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.status(401).json({ error: 'Mot de passe incorrect' });
    }
    const token = jwt.sign(
      { id: user.user_id, username: user.username, is_admin: user.is_admin },
      SECRET_KEY,
      { expiresIn: '24h' }
    );
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
