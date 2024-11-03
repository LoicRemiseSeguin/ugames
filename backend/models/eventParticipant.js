module.exports = (sequelize, DataTypes) => {
    const EventParticipant = sequelize.define('EventParticipant', {
      user_id: DataTypes.INTEGER,
      event_id: DataTypes.INTEGER,
      is_going: DataTypes.BOOLEAN,
    }, { timestamps: false });
  
    return EventParticipant;
  };
  