import { log } from 'console';
import fs from 'fs';

function nikhilPromise(){
    return new Promise(function(resolve){
        fs.readFile("a.txt", "utf-8", function(err, data){
            resolve(data);
        })
    })
}

function onDone(data){
    console.log(data);
    
}
nikhilPromise().then(onDone);
// let p = new Promise()

const date  = new Date();
console.log(date.getTime());
