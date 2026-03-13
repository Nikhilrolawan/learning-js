import mongoose from "mongoose";
const username = process.env.USERNAME
const password = encodeURIComponent(process.env.PASSWORD)
const host = process.env.HOST
const db = process.env.DB
mongoose.connect(`mongodb+srv://${username}:${password}@${host}/${db}`);


const AdminSchema = new mongoose.Schema(
    {
        username: String,
        password: String
    }
);

const UserSchema = new mongoose.Schema(
    {
        username: String,
        password: String,
        purchasedCourses:[{
            type: mongoose.Types.ObjectId,
            ref: "Course"
        }]
    }
);

const CourseSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        price: Number,
        imageLink: String
    }
);

const Admin = mongoose.model("Admin", AdminSchema);
const User = mongoose.model("User", UserSchema);
const Course = mongoose.model("Course", CourseSchema);

export { Admin, User, Course };