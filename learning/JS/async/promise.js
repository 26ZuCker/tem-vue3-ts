function asyncAdd(a, b, cb) {
  setTimeout(() => {
    cb(null, a + b);
  }, 100);
}
async function sum(...rest) {
  // 取出来第一个作为初始值
  let result = rest.shift();
  // 通过for of 遍历 rest, 依次相加
  for (let num of rest) {
    // 使用promise 获取相加结果
    result = await new Promise((resolve) => {
      asyncAdd(result, num, (_, res) => {
        resolve(res);
      });
    });
  }
  // 返回执行结果
  return result;
}
async function sum(...rest) {
  // 如果传的值少于2个，则直接返回
  if (rest.length <= 1) {
    return rest[0] || 0;
  }
  const promises = [];
  // 遍历将数组里面的值两个两个的执行
  for (let i = 0; i < rest.length; i += 2) {
    promises.push(
      new Promise((resolve) => {
        // 如果 rest[i+1] 是 undefined, 说明数组长度是奇数，这个是最后一个
        if (rest[i + 1] === undefined) {
          resolve(rest[i]);
        } else {
          // 调用asyncAdd 进行计算
          asyncAdd(rest[i], rest[i + 1], (_, result) => {
            resolve(result);
          });
        }
      })
    );
  }
  // 获取第一次计算结果
  const result = await Promise.all(promises);
  // 然后将第一次获取到的结果即 [3,7,11] 再次调用 sum执行
  return await sum(...result);
}
async function sum(...rest) {
  let result = 0;
  // 隐氏类型转换， 对象 + 数字，会先调用对象的toString 方法
  const obj = {};
  obj.toString = function() {
    return result;
  };
  const promises = [];
  for (let num of rest) {
    promises.push(
      new Promise((resolve) => {
        asyncAdd(obj, num, (_, res) => {
          resolve(res);
        });
      }).then((res) => {
        // 在这里将 result的值改变之后，obj.toString 的返回值就变了，这时候下一个setTimeout调用时就使用了新值
        result = res;
      })
    );
  }
  await Promise.all(promises);
  return result;
}
const start = window.performance.now();
sum(1, 2, 3, 4, 5, 6).then((res) => {
  console.log(res);
  console.log(window.performance.now() - start);
});
