console.log("Importing cat.js...")

var name = process.argv[2];

var Cat = require("./cat.js").Cat;

var userCat = new Cat(name);

console.log(userCat.meow());
