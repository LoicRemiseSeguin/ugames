module.exports = (sequelize, DataTypes) => {
    const EventNotification = sequelize.define('EventNotification', {
      notification_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: DataTypes.INTEGER,
      event_id: DataTypes.INTEGER,
      notification_date: DataTypes.DATE,
      notification_type: DataTypes.ENUM('invite', 'reminder', 'update'),
    }, { timestamps: false });
  
    return EventNotification;
  };
  