const router = require('express').Router();

const { createUserTask, endingTask } = require('../controllers/task-conroller');

router.post('/', async (req, res) => {
  if (!req.body.task) {
    return res.sendStatus(400).end();;
  }
  const createTask = await createUserTask(req.session.user.id, req.body).catch(
    (e) => e,
  );
  if (createTask instanceof Error) {
    return res.sendStatus(500).end();
  }
  return res.json(createTask);
});

router.post('/stop', async (req, res) => {
  const ending = await endingTask(req.session.user.id, req.body).catch(
    (e) => e,
  );

  if (ending instanceof Error) {
    return res.sendStatus(500).end();
  }
  return res.json(ending);
});

module.exports = router;
