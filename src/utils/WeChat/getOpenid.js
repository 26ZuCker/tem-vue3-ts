import Taro from '@tarojs/taro';
/**
 * 获取openid
 */
const getOpenid = function() {
  return new Promise((resolve, reject) => {
    Taro.cloud.callFunction({
      name: 'login',
      data: {},
      success: (res) => {
        app.globalData.openid = res.result.openid;
        return resolve(res);
      },
      fail: (err) => {
        console.error('[云函数] [login] 调用失败', err);
        return reject(err);
      },
    });
  });
};
export default getOpenid;
