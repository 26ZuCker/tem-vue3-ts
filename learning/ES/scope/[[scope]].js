function Person() {
  this.a = 1;
}
Person.prototype = {
  //constructor: Person,
  say() {
    console.log(this.a);
  },
};

const man = new Person();
/**
 * [[Scopes]]: Scopes[2]
    0: Script
    man: Person {a: 1}
    woman: Person {a: 1}
    1: Global
 */
console.log(man);

const woman = new Person();
console.log(woman);
