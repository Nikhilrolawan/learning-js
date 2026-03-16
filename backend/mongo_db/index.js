import express from "express";
import { adminRouter } from "./routes/admin.js";
import { userRouter } from "./routes/user.js";

const app = express()
const PORT = process.env.PORT
 
app.use(express.json())
app.use("/admin", adminRouter)
app.use("/user", userRouter)

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})