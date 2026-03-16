import { User } from "../database/mongo.js"

async function userMiddleware(req, res, next){
    const username = req.headers.username;
    const password = req.headers.password;
    try {
        const exist = await User.findOne({"username": username, "password": password})
        if (exist) {
            return next(); 
        } else {
            return res.status(403).json({
                message: "User not found or invalid credentials" 
            });
        }
    } catch(error) {
        next(error);
    }
};

export { userMiddleware };