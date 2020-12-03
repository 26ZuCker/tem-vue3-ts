let a = function() {
  console.log(this);
};
let b = () => {
  console.log(this);
};
let c = {
  a: 1,
  b: {
    c: function() {
      console.log(this);
    },
    d: () => {
      console.log(this);
    },
  },
};
c.b.c();
c.b.d();
/* class D {
  constructor() {}
  f1(args) {
    console.log(agrs)
  }
  f2() {
    const a = 1
    return this.f1.bind(this, a)
  }
}
 */
