"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
      // A Task belongs to a User (via assigneeId)
      Task.belongsTo(models.User, {
        foreignKey: "assigneeId",
        as: "assignee",
      });
    }
  }

  Task.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      title: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: false },
      assigneeId: { type: DataTypes.INTEGER, allowNull: false, references: {model: 'Users'} },
    },
    {
      sequelize,
      modelName: "Task", // ← also fix: was "User" in your snippet
    },
  );

  return Task; // ← also fix: was returning User
};
