const { Op } = require('sequelize');
const { Task } = require('../db/models');
const msToTime = require('../common/getTime');


module.exports = {
  async getTasksUser(userId) {
    const tasks = await Task.findAll({
      where: {
        userid: userId,
      },
      order: [
        ['id', 'DESC'],
      ],
    }).catch((e) => e);
    if (tasks instanceof Error) {
      throw tasks;
    }
    const result = tasks.map((el) => {
      const result = {};
      result.task = el.task
      result.id = el.id
      result.beginning = el.beginning.toLocaleString();
      result.time_spent = el.time_spent
      if (el.dataValues.ending) {
        result.ending = el.beginning.toLocaleString();
      }
      return result;
    })
    return result;
  },

  async createUserTask(userId, inputTask) {
    const task = await Task.findOne({
      where: {
        userid: userId,
        ending: {
          [Op.is]: null,
        },
      },
    }).catch((e) => e);

    if (task instanceof Error) {
      throw task;
    }
    if (task) {
      return null;
    }

    const createTask = await Task.create({
      userid: userId,
      ...inputTask,
    }).catch((e) => e);

    if (createTask instanceof Error) {
      throw createTask;
    }

    createTask.dataValues.beginning = createTask.dataValues.beginning.toLocaleString();
    const result = {};
    result.id = createTask.id
    result.task = createTask.task
    result.beginning = createTask.beginning
    return result;
  },
  async endingTask(userId, taskId) {
    const task = await Task.findOne({
      where: {
        userid: userId,
        ...taskId,
        ending: {
          [Op.is]: null,
        },
      },
    }).catch((e) => e);

    if (task instanceof Error) {
      throw task;
    }

    if (!task) {
      return null;
    }
    task.ending = new Date();
    const timeSpent = msToTime(task.ending - task.beginning);
    task.time_spent = timeSpent;

    const taskEndingSave = await task.save()
      .catch((e) => e);

    if (taskEndingSave instanceof Error) {
      throw taskEndingSave;
    }
    const result = {};
    result.id = task.id;
    result.task = task.task;
    result.beginning = task.beginning.toLocaleString();
    result.ending = task.ending.toLocaleString();
    result.time_spent = task.time_spent;
    return result;
  },
};
