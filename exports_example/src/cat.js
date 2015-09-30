var Cat = function (userName) {
  this.name = userName;
}

Cat.prototype.meow = function () {
  return this.name + " is meowing...";
}

//module.exports === {};
module.exports.Cat = Cat;
