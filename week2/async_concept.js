import fs from "fs";
fs.readFile("a.txt", "utf-8", function(err, data){ // asynchronus call
    console.log(data);
});
console.log("hi i'll run while you read a.txt");

setTimeout(function(){
    console.log("i'll take 5 sec");
    
}, 5000);

setTimeout(function(){
    console.log("i'll take 10 sec");
    
}, 10000);

for(let i = 0; i < 10; i++){

}
console.log("i'm 2nd last");
for(let i = 0; i < 8; i++){
    
}
console.log("i'm last");
