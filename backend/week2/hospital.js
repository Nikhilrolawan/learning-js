import express from "express";
// import { z } from "zod";
const app = express();
app.use(express.json()) // middleware to recieve post requests in body format 
// if we know that if every routes need above middleware then we use app.use()

const users = [{
    name: "keshav",
    kidneys:[
    {healthy: true},
    {healthy: false}
    ]
}]

app.get("/", (req, res) => { // getting some data
    const totalKidneys = users[0].kidneys.length;
    const healthyKidneys = users[0].kidneys.filter(kidney => kidney.healthy === true).length
    const numberOfunhealthyKidneys = totalKidneys - healthyKidneys;
    res.json({
        totalKidneys,
        healthyKidneys,
        numberOfunhealthyKidneys
    })
})
app.post("/", (req, res) => { // adding some data
    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({healthy: isHealthy})
    res.json({
        "message": "Succesfully submitted"
    })
})
app.put("/", (req, res) => { // like replacing some data
    const kidneys = users[0].kidneys
    kidneys.forEach(kidney => {kidney.healthy = true})
    res.json({
        "message": "Made healthy"
    })
})
app.delete("/", (req, res) => { // you know
    const unhealthyKidneys = users[0].kidneys.filter(kidney => kidney.healthy === true)
    users[0].kidneys = unhealthyKidneys;
    res.json({
        "message": "succesfully removed unhealthy kidney"
    })
})

app.listen(3001);