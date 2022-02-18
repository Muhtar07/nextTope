const router = require('express').Router();

const { createUserTask, endingTask } = require('../controllers/task-conroller');

router.post('/', async (req, res) => {
  if (!req.body.task) {
    return res.sendStatus(400).end();
  }
  const createTasks = await createUserTask(req.session.user.id, req.body).catch(
    (e) => e,
  );
  if (createTasks instanceof Error) {
    return res.sendStatus(500).end();
  }

  const createTask = {};
  createTask.id = createTasks.id;
  createTask.task = createTasks.task;
  createTask.beginning = createTasks.beginning.toLocaleString();
  return res.json(createTask);
});

router.post('/stop', async (req, res) => {
  const task = await endingTask(req.session.user.id, req.body).catch(
    (e) => e,
  );

  if (task instanceof Error) {
    return res.sendStatus(500).end();
  }
  const ending = {};
  ending.id = task.id;
  ending.task = task.task;
  ending.beginning = task.beginning.toLocaleString();
  ending.ending = task.ending.toLocaleString();
  ending.time_spent = task.time_spent;

  return res.json(ending);
});

module.exports = router;
