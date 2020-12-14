import fs from 'fs';

const promisify = (fn: Function) => (...rest: any[]) =>
  new Promise((resolve, reject) => {
    rest.push((err: string, ...args: any[]) => (err ? reject(err) : resolve(args)));
    fn.call(this, ...rest);
  });

const fsp = new Proxy(fs, {
  get(tar, key) {
    return promisify(tar[key]);
  },
});
