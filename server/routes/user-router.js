const router = require('express').Router();
const bcrypt = require('bcrypt');

const { User } = require('../db/models');
const authUser = require('../middleware/auth-user');
const { createNewUser } = require('../controllers/user-controller');

router.get('/signin', authUser, async (req, res) => {
  res.render('signin');
});

router.get('/signup', authUser, async (req, res) => {
  res.render('signup');
});

router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  if (name && email && password) {
    const newUser = await createNewUser(name, email, password).catch((e) => e);
    req.session.user = {
      id: newUser.id,
      name: newUser.name,
    };

    if (newUser instanceof Error) {
      return res.redirect('/user/signup');
    }
    return res.redirect('/');
  }
  return res.redirect('/user/signup');
});

router.post('/signin', authUser, async (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    try {
      const currentUser = await User.findOne({ where: { email } });
      if (currentUser && (await bcrypt.compare(password, currentUser.password))) {
        req.session.user = {
          id: currentUser.id,
          name: currentUser.name,
        };
        return res.redirect('/');
      }
      return res.redirect('user/sigin');
    } catch (err) {
      return res.redirect('user/signin');
    }
  } else {
    return res.redirect('/user/signin');
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.clearCookie('sId').redirect('/');
});

module.exports = router;
