const jwt = require("jsonwebtoken");
const authMiddleWare = (requiredRole = null) => {
    return (req, res, next) => {
        try {
            const authHeaders = req.headers.authorization;
            if (!authHeaders || !authHeaders.startsWith("Bearer "))
            {
                            return res
                              .status(401)
                              .json({
                                success: false,
                                message: "token not found",
                              });

            }

            const token = authHeaders.split(" ")[1];

            const decode = jwt.verify(token, process.env.secret_key);
            console.log(decode)
            req.userid = decode.userid;
            req.role = decode.role;
            console.log(decode.role);
            if (requiredRole && req.role !== requiredRole)
            {
                 return res.status(403).json({
                   success: false,
                   message: "forbidden: Access Denied",
                 });

            }
            next();

        }
        catch (err)
        {
            return res.status(401).json({success:true,message:"Invalid or Expired Token"})
        }
      }
};
module.exports = authMiddleWare;