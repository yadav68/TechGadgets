export function isAdmin(req, res, next) {
  if (req.session.user && req.session.user.isAdmin) {
    return next();
  }
  req.flash('error_msg', 'You are not authorized to perform this action');
  res.redirect('/products');
} 