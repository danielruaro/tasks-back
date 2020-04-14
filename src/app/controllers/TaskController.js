import * as Yup from "yup";
import { startOfHour, parseISO, isBefore, format, subHours } from "date-fns";
import pt from "date-fns/locale/pt";
import { Op } from "sequelize";
import User from "../models/User";
import Task from "../models/Task";

class TaskController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const { description = "", name = "" } = req.query;

    const tasks = await Task.findAll({
      where: {
        description: { [Op.like]: `%${description}%` },
      },
      attributes: ["id", "description", "started_at", "finished_at"],
      include: [
        {
          model: User,
          where: { name: { [Op.like]: `%${name}%` } },
          as: "user",
          attributes: ["name"],
        },
        {
          model: User,
          as: "creator",
          attributes: ["name"],
        },
      ],
      order: [["created_at", "DESC"]],
    });

    res.json(tasks);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      user_id: Yup.number().required(),
      started_at: Yup.date().required(),
      finished_at: Yup.date(),
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validation fails" });
    }

    const userCreator = await User.findOne({
      where: {
        id: req.userId,
      },
    });

    const userValid = await User.findOne({
      where: {
        id: req.body.user_id,
      },
    });

    if (!userValid) {
      return res.status(400).json({ error: "User not found" });
    }

    const task = await Task.create({
      user_id: req.body.user_id,
      creator_id: req.userId,
      description: req.body.description,
      started_at: req.body.started_at,
    });

    res.status(200).json(task);
  }

  async update(req, res) {
    const task = await Task.findByPk(req.body.id);

    await task.update({
      finished_at: `${new Date().toISOString().slice(0, 19)}-03:00`,
    });

    return res.json({ message: "Task updated" });
  }
}

export default new TaskController();
