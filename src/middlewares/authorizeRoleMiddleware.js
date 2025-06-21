export const authorizeRole = (allowedRoles) => {
  return (req, res, next) => {
    try {
      const userRole = req.user.role;

      if (!allowedRoles.includes(userRole)) {
        res.status(404).json({ code:404, message:'Você não tem permissão para acessar este recurso'});
      }

      next();
    } catch (err) {
      next(err)
    }
  };
};