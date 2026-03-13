import express from "express";
const app = express();
const port  = 3000;

const numOfRequets = 0;
function countRequest(req, res, next){
    numOfRequets ++;
    next(); // this function will prevent intruption of the execution
}
app.get('/', numOfRequets, (req, res) => {
    res.send("hello world") // next method will ensure control reaches at this line after executing this middleware countRequests()
}); // a middleware can be authentication or validation..

app.get("/conversation", (req, res) =>{
    const n = Number(req.query.n);
    const ans = (n*(n+1))/2;
    res.send(ans.toString());
})

// this is the global error catcher
app.use((err, res, req, next) => {
    res.json({
        msg: "something wrong happned"
    })
})
app.listen(port, () => {
    console.log(`Hi i'm runnnig on ${port}`);  
})