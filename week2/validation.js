import * as z from "zod";
const schema = z.array(z.number())
console.log(schema.safeParse([1,2,3]));

