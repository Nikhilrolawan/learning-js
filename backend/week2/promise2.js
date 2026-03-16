// var p = new Promise(function(resolve){
//     setTimeout(resolve("hi there"), 10000);
// });
// console.log(p);

// p.then(function(data){
//     console.log(data);
// });

function myOwnSetTimeout(duration){
    return new Promise(function(resolve){
        setTimeout(resolve(), duration)
    })
}
const p = myOwnSetTimeout(5000)
// myOwnSetTimeout(10000).then(function(){
//     console.log("log the first thing");
// })
console.log(p);
p.then(function(){
    console.log("call after resolved");
    
})

async function main(params) {
    const val = await myOwnSetTimeout(1000);
    console.log(val);
}