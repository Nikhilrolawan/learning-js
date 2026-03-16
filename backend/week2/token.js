import jwt from "jsonwebtoken";

const token = jwt.sign({
    username: "rahul"
}, "secret");
console.log(token);
