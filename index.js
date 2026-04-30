const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const { Sequelize, DataTypes, where } = require("sequelize");
const { User, Task } = require("./db/models");

const app = express();

app.use(express.json());

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: process.env.DATABASE_DIALECT,
    port: process.env.DATABASE_PORT,
    logging: console.log,
  },
);

// const User = sequelize.define(
//   "User",
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     firstName: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     lastName: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//     },
//     role: {
//       type: DataTypes.ENUM("user", "admin"),
//       allowNull: false,
//       defaultValue: "user",
//     },
//     isActive: {
//       type: DataTypes.BOOLEAN,
//       allowNull: false,
//       defaultValue: true,
//     },
//   },
//   {},
// );

app.get("/users", async (req, res) => {
  const isActive = req.query.isActive;

  if (isActive) {
    const activeUsers = await User.findAll({ where: { isActive: true } });

    if (activeUsers.length === 0) {
      return res.status(404).json({ message: "No active users found" });
    }

    return res
      .status(200)
      .json({
        message: "All active users retrieved successfully",
        activeUsers,
      });
  }

  const users = await User.findAll();

  if (users.length === 0) {
    return res.status(404).json({ message: "No users found" });
  }

  return res
    .status(200)
    .json({ message: "All users retrieved successfully", users });
});

app.post("/user", async (req, res) => {
  // 1. get the data from the req body
  let user = req.body;

  // 2. check if the user already exists
  const foundUser = await User.findOne({ where: { email: user.email } });

  if (foundUser)
    return res.status(400).json({ message: "sorry this user exists already" });

  const newUser = await User.create(user);

  return res.status(201).json({ message: "user added successfuly", newUser });
});

app.get("/user/:id", (req, res) => {
  const id = req.params.id;

  const foundUser = users.find((user) => user.id == id);

  if (!foundUser) {
    return res
      .status(404)
      .json({ message: "User with this id does not exist" });
  }

  return res.status(200).json(foundUser);
});

app.patch("/user/:id", (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  console.log(updatedData);
  let foundUser = users.find((u) => u.id == id);
  console.log(foundUser);

  if (!foundUser)
    return res
      .status(404)
      .json({ message: "this user does not exist in our record" });

  let updatedUser = { ...foundUser, ...updatedData };

  return res
    .status(201)
    .json({ message: "user updated successfully", updatedUser });
});

app.put("/user/:id", (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  const foundUser = users.find((u) => (u.id = id));

  if (!foundUser) return res.status(404).json({ message: "user not found" });

  const updatedUser = {
    id: foundUser.id,
    createdAt: foundUser.createdAt,
    ...updatedData,
  };

  return res
    .status(201)
    .json({ message: "user updated successfully", updatedUser });
});

app.delete("/user/:id", (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  const foundUser = users.find((u) => (u.id = id));

  if (!foundUser) return res.status(404).json({ message: "user not found" });

  users = users.filter((u) => u.id != id);

  return res.status(201).json({ message: "user updated successfully", users });
});


app.get('/tasks', async (req, res) => {
  console.log(Task)
  const tasks = await Task.findAll({});
  console.log(tasks)

  return res.status(200).json({message: 'tasks retrieved successfully', tasks})
})



app.listen(process.env.PORT, async () => {
  await sequelize.authenticate();
  // await sequelize.sync({ force: true });
  console.log("Server is running on port http://localhost:1234");
});
