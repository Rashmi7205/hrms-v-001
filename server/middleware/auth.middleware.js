import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ success: false, message: 'Unauthorized' });

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;

    next();
  } catch (error) {
    res.status(403).json({ success: false, message: 'Forbidden' });
  }
};

export const roleMiddleware = (requiredRole) => (req, res, next) => {
  if (req.user.role !== requiredRole) {
    return res.status(403).json({ success: false, message: 'Access denied' });
  }
  next();
};
