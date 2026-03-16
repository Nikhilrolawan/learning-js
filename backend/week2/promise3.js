function resolveAfter2seconds(){
    const p = new Promise(function(accept, doNotAccept){
        setTimeout(()=>
            console.log("im inside promise"), 2000);
        accept("success");
})
    return p;
}
resolveAfter2seconds().then(function(data){
    console.log(data);
})

import fs from "fs";
const data = fs.readFileSync("a.txt","utf-8");
console.log(data);
