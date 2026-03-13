const nums = [1,2,3,4,5]
// const doubleNum = nums.map(num => num *2)
// const doubleNum = nums.map((num) => {return num *2})
// console.log(doubleNum);

class myMap{
    Map(iterable, fn){
        this.result = []
        iterable.forEach(element => {
            this.result.push(fn(element));
        });
        return this.result
    }   
}
const m = new myMap();
const ans = m.Map(nums, num => num*2);
console.log(ans);
