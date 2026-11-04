const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userModel=require("../model/user.model")
const registerUser = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        if (!email || !password) {
            res.status(400).json({ success: false, message: "userdetails not found" });
        }
        const emailExists = await userModel.findOne({ email });

        if (emailExists)
        {
                        res
                          .status(404)
                          .json({
                            success: false,
                            message: "email already exists",
                          });

        }
         const passwordHash=await bcrypt.hash(password,10)
        const newUser = await userModel.create({ username, email, password: passwordHash, role });
        
        return res.status(200).json({ succss: true, message: "user register successfully",newUser });

    }
    catch (err)
    {
        return res.status(500).json({ success: false, message: "user register operation failed" });
    }
}

const loginUser = async (req, res) => {
    try {
        
        const {  email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res
              .status(404)
              .json({ success: false, message: "incorrect email and password" });
        }
        const passwordmatch = await bcrypt.compare(password, user.password);
        if (!passwordmatch)
        {
            return res
              .status(400)
              .json({
                success: false,
                message: "incorrect email and password",
              });
        }
//user payload data,secret key,duration
         const token = jwt.sign(
          { userid: user._id, username: user.username, role:user.role },
            process.env.secret_key,
          {expiresIn:"24hr"}
        );
        return res.status(200).json({ success:true,messgae:"login successfully",token})
    }
    catch (err)
    {
        return res.status(500).json({success:false,message:"login failed"})
    }
}
module.exports = {registerUser,loginUser}
