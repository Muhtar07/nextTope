const router = require('express').Router();
const { getTasksUser } = require('../controllers/task-conroller');

router.get('/', async (req, res) => {
  if (req.session.user) {
    const tasks = await getTasksUser(req.session.user.id)
      .catch((e) => e);
    return res.render('index', { tasks });
  }
  return res.render('index');
});

module.exports = router;
