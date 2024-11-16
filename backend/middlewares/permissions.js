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
  
  module.exports = checkAdminOrSelf;
