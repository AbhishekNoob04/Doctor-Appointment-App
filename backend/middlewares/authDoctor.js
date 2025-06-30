import jwt from 'jsonwebtoken'

//doctor authentication middleware
export const authDoctor = (req, res, next) => {
  const { dtoken } = req.headers;
  if (!dtoken) {
    return res.status(401).json({ success: false, message: 'Not Authorized. Please login again.' });
  }

  try {
    const decoded = jwt.verify(dtoken, process.env.JWT_SECRET);
    // console.log(decoded.id);
    
    req.doc = { id: decoded.id };
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Token invalid or expired.' });
  }
};



export default authDoctor