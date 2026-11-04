const mongoose = require("mongoose");
const dbConnection = async (req, res) => {
    try {
        await mongoose.connect(process.env.db_Uri);
        console.log("db connected successfully")
    }
    catch (err)
    {
        
        console.log(err);
        process.exit(1);
    }
};
module.exports = dbConnection;