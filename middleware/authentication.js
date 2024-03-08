// const jwt = require("jsonwebtoken");
// const User = require("../models/modules");

// const authMiddleware = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization.split(" ")[1];
//     if (!token) {
//       return res.status(401).json({ error: "Token not provided" });
//     }
//     const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
//     const user = await User.findById(decoded._id);
//     if (!user) {
//       return res.status(401).json({ error: "User not found" });
//     }
//     req.user = user;
//     next();
//   } catch (error) {
//     res.status(401).json({ error: "Invalid token" });
//   }
// };

// module.exports = authMiddleware;
