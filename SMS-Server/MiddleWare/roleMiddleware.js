  

//Role-based Access Control Middleware

exports.authorize = (roles) => {
    return (req, res, next) => {
      console.log("User role:", req.user.role); // Log the role to verify
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Access denied' });
      }
      next();
    };
  };
  