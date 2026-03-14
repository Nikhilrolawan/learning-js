import express from "express";
import jwt from "jsonwebtoken";
import Router from "express";

import { userMiddleware } from "../middleware/user.js";
import { User, Course } from "../database/mongo.js";

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

userRouter.post("/signin", async (req, res) => {
    const { username, password } = req.body;
    const exist = await User.find({ username, password });
    if (exist) {
        const token = await jwt.sign(username, process.env.JWT_SECRET);
        return res.json({
            msg: "Success",
            token: token
        })
    } else {
        return res.status(401).json({
            msg: "Invalid credentials."
        })
    }
});

userRouter.post("/courses/:courseID", userMiddleware, async (req, res) => {
    // purchasing a course by a user
    try {
        const courseID = req.params.courseID;
        const username = req.username;
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
   const username = req.username;
   const user = await User.findOne({username}).populate("purchasedCourses", "title");
   return res.json({
    your_courses: user.purchasedCourses,
 });
});

userRouter.get("/courses", async (req, res) => {
    // get the all available courses
   const courses = await Course.find({});
   return res.json({
    available_courses: courses
 });
});

export { userRouter };