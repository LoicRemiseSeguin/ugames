const checkAdmin = (req, res, next) => {
  if (req.user.is_admin) {
    return next();
  }

  return res.status(403).json({ error: 'Accès interdit : administrateur requis' });
};

const checkAdminOrSelf = (req, res, next) => {
  const { is_admin, id } = req.user;

  if (is_admin) {
    return next();
  }

  if (parseInt(req.params.id) === id) {
    return next();
  }

  return res.status(403).json({ error: 'Accès interdit' });
};

module.exports = {
  checkAdmin,
  checkAdminOrSelf,
};
