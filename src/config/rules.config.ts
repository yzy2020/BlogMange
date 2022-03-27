// 11位手机号码
export const rulePhone = /^[1]([3-9])[0-9]{9}$/;

// 身份证号
export const ruleIdentify = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;

// 数字
export const ruleNumber = /^[0-9]*$/;

// 邮箱
export const ruleEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
