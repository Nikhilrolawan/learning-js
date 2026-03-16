import express from "express";
import jwt from "jsonwebtoken";

const jwtPassword = "123456";
const app = express();

const ALL_USERNAME = [
    {
        username: "nikhil@gmail.com",
        password: "123",
        name: "nikhil rolawan"
    },

    {
        username: "kshav@gmail.com",
        password: "1234",
        name: "keshav chauhan"
    },

    {
        username: "pranu@gmail.com",
        password: "12354",
        name: "Pranay majumder"
    },
]

function userExist(username, password){
    const existence = ALL_USERNAME.some(user => user.username === username && user.password === password);
    return existence;
}

app.use(express.json());

app.post('/signin', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if(!userExist(username, password)){
        return res.status(403).json({
            msg: "User does not exists"
        })
    }
    var token = jwt.sign({ username: username }, jwtPassword)
    return res.json({
        token,
    })
})

app.get("/users", (req,res) => {
    const token = req.headers.authorization;
    try {
        const decoded = jwt.verify(token, jwtPassword)
        const username = decoded.username;
        const users = ALL_USERNAME.filter(user => user.username !== username);
        return res.json({
            users
        })
    } catch(err) {
        return res.status(403).json({
            msg: "Invalid token"
        })
    }
})

app.listen(3000)