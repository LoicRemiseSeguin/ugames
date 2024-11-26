module.exports = (sequelize, DataTypes) => {
    const Event = sequelize.define('Event', {
      event_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      creator_id: DataTypes.INTEGER,
      game_id: DataTypes.INTEGER,
      event_name: DataTypes.STRING,
      event_description: DataTypes.TEXT,
      event_date: DataTypes.DATE,
      is_public: DataTypes.BOOLEAN,
      city: DataTypes.STRING,
    }, { timestamps: false });
  
    return Event;
  };
  