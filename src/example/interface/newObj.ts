interface i_Person {
  name: string;
  getName: () => string;
}
interface c_Person {
  new (name: string): i_Person;
}
class Person implements i_Person {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  getName() {
    return this.name;
  }
}
function newObj<T, U>(constructor: any | T, ...args: any[]): U {
  //return 'Promise' in window ? new constructor(...args) : new constructor().apply(null, args);
  return new constructor(...args);
}
const man = newObj<c_Person, i_Person>(Person, 'zeng');
console.log(man);
