const express = require('express');
const usersRouter = require('./users');
const gamesRouter = require('./games');
const eventsRouter = require('./events');
const eventParticipantsRouter = require('./eventParticipants');
const eventNotificationsRouter = require('./eventNotifications');
const friendsRouter = require('./friends');
const userStatisticsRouter = require('./userStatistics');

const router = express.Router();

router.use('/users', usersRouter);
router.use('/games', gamesRouter);
router.use('/events', eventsRouter);
router.use('/event-participants', eventParticipantsRouter);
router.use('/event-notifications', eventNotificationsRouter);
router.use('/friends', friendsRouter);
router.use('/user-statistics', userStatisticsRouter);

module.exports = router;
