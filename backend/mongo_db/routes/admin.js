import express from "express";
import { adminMiddleware } from "../middleware/admin.js";
import Router from "express";
import { Admin, Course } from "../database/mongo.js";

const adminRouter = Router()
adminRouter.use(express.json())

adminRouter.post("/signup", async (req, res) => {
    const { username, password } = req.body;
    if(!username || !password){
        return res.status(400).json({
            msg: "username and password required."
        })
    }
    const exist = await Admin.findOne({username})
    if (exist) {
        return res.json({
            msg: "User already signed up with these credentials."
        })
    } 
    await Admin.create(
        {username: username, password: password}
    )
    return res.status(201).json({
        msg: "Admin succesfully signed up"
    })
});

adminRouter.use(adminMiddleware)

adminRouter.post("/courses", async (req, res) => {
    const { title, description, price, imageLink } = req.body;
    const newCourse = await Course.create({ title, description, price, imageLink });
    return res.status(201).json({
        msg: "Course created succesfully.",
        course_id: newCourse._id
    })
    
})

adminRouter.get("/courses", async (req, res) => {
    try {
        const courses = await Course.find({})
        return res.status(200).json({ courses });
    } catch (error) {
        return res.status(500).json({ msg: "something went wrong!" })
    }
})

export {adminRouter};