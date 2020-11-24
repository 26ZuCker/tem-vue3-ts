/**
 * 中国区手机号
 */
const phone = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/;
/**
 * 不限个数的正整数
 */
const positiveInteger = /^\+?[1-9]\d*$/;

export { phone, positiveInteger };
