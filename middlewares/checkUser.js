var checkLogin = (req, res, next) => {
  if(req.session.user) {
    res.redirect('/profile');
  } else {
    next();
  }
}

module.exports = checkLogin
