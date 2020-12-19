//测试目标通过import进来
function add(a, b) {
  return a + b;
}

//测试套件，内部包含若干的一整套测试用例，当且仅当一个失败整个都失败
//通过yarn test test:unit执行tests/unit下所有.spec.js
describe('test', () => {
  it('test add', () => {
    //断言 assert
    expect(add(1, 1)).toBe(2);
  });
});
