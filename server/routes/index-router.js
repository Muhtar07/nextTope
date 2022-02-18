const router = require('express').Router();
const { getTasksUser } = require('../controllers/task-conroller');

router.get('/', async (req, res) => {
  if (req.session.user) {
    let tasks = await getTasksUser(req.session.user.id)
      .catch((e) => e);
    tasks = tasks.map((el) => {
      const result = {};
      result.task = el.task;
      result.id = el.id;
      result.beginning = el.beginning.toLocaleString();
      result.time_spent = el.time_spent;
      if (el.dataValues.ending) {
        result.ending = el.beginning.toLocaleString();
      }
      return result;
    });
    return res.render('index', { tasks });
  }
  return res.render('index');
});

module.exports = router;
