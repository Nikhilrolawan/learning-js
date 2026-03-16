import jwt from "jsonwebtoken";

async function userMiddleware(req, res, next) {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Missing auth headers" });
    }
    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET)
        if (decoded) {
            req.username = decoded;
            return next();
        } else {
            return res.status(403).json({
                message: "User not found or invalid credentials"
            });
        }
    } catch (error) {
        res.status(500).json({
            msg: "something bad happened!"
        })
    }
};

export { userMiddleware };
