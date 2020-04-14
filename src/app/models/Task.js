import Sequelize, { Model } from "sequelize";

class Task extends Model {
  static init(sequelize) {
    super.init(
      {
        creator_id: Sequelize.INTEGER,
        user_id: Sequelize.INTEGER,
        description: Sequelize.TEXT,
        started_at: Sequelize.STRING,
        finished_at: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
    this.belongsTo(models.User, { foreignKey: "creator_id", as: "creator" });
  }
}

export default Task;
