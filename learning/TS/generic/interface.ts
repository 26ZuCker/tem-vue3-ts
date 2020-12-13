export interface a<T> {
  name: T;
}
export interface b {
  age: number;
}
export interface c extends a<number>, b {
  gender: string;
}
const a: c = {
  name: 9,
  age: 1,
  gender: '',
};

function sum(...params: number[]): number {
  let res = 0;
  params.reduce((prev: number, cur: number) => {
    return (prev += cur);
  }, 0);
  return res;
}
sum();
