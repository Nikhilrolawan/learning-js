import { Admin } from "../database/mongo.js"

async function adminMiddleware(req, res, next){
    const { username, password } = req.headers;
    
    if (!username || !password) {
        return res.status(401).json({ message: "Missing auth headers" });
    }
    
    try {
        const exist = await Admin.findOne({username: username, password: password})
        // console.log(exist);
        
        if (exist) {
            return next(); 
        } else {
            return res.status(403).json({
                message: "Admin not found or invalid credentials" 
            });
        }
    } catch(error) {
        next(error);
    }
};

export { adminMiddleware };
