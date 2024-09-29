module.exports = (sequelize, DataTypes) => {
    const UserStatistic = sequelize.define('UserStatistic', {
      user_id: DataTypes.INTEGER,
      game_id: DataTypes.INTEGER,
      total_played: DataTypes.INTEGER,
      average_score: DataTypes.FLOAT,
    }, { timestamps: false });
  
    return UserStatistic;
  };
  