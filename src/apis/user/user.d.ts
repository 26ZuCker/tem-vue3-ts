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
