module.exports = (sequelize, DataTypes) => {
    const Game = sequelize.define('Game', {
      game_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      category: DataTypes.STRING,
      average_playtime: DataTypes.INTEGER,
      min_players: DataTypes.INTEGER,
      max_players: DataTypes.INTEGER,
    }, { timestamps: false });
  
    return Game;
  };
  