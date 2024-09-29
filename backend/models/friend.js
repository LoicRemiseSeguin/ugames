module.exports = (sequelize, DataTypes) => {
    const Friend = sequelize.define('Friend', {
      user_id1: DataTypes.INTEGER,
      user_id2: DataTypes.INTEGER,
      friendship_status: DataTypes.ENUM('pending', 'accepted', 'blocked'),
    }, { timestamps: false });
  
    return Friend;
  };
  