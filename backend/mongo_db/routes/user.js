import express from "express";
import { userMiddleware } from "../middleware/user.js";
import Router from "express";
import { User, Course } from "../database/mongo.js";
import { log } from "node:console";

const userRouter = Router()
userRouter.use(express.json())

userRouter.post("/signup", async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({
            msg: "username and password required."
        })
    }
    const exist = await User.findOne({ username })
    if (exist) {
        return res.json({
            msg: "User already signed up with these credentials."
        })
    }
    await User.create(
        { username: username, password: password }
    )
    return res.status(201).json({
        msg: "User succesfully signed up"
    })
});


userRouter.post("/courses/:courseID", userMiddleware, async (req, res) => {
    // purchasing a course by a user
    try {
        const courseID = req.params.courseID;
        const username = req.headers.username;
        await User.updateOne(
            { username: username },
            { "$push": { purchasedCourses: courseID } }
        )
        return res.json({
            msg: "purchased successfully",
            id: courseID
        })
    } catch (e) {
        console.log(e);
    }
})

userRouter.get("/purchasedCourses", userMiddleware, async (req, res) => {
    // get the purchased courses by the user
   const username = req.headers.username;
   const user = await User.findOne({username}).populate("purchasedCourses", "title");
   return res.json({
    your_courses: user.purchasedCourses,
});
});

export { userRouter };