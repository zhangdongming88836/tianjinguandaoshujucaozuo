// /* 合法uri*/
// export function validateURL(textval) {
//   const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
//   return urlregex.test(textval)
// }

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function validateAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * validate email
 * @param email
 * @returns {boolean}
 */
export function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}
/**
 * 过滤特殊字符
*/
export function stripscript(s) {
  var pattern = new RegExp("[`~!#$^&*()=|{}':;',\\[\\]<>/?~！#￥……&*（）&% ;—|{}【】‘；：”“'。，、？]")
  var rs = "";
  for (var i = 0; i < s.length; i++) {
  rs = rs + s.substr(i, 1).replace(pattern, '');
  }
  return rs;
}
/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return !urlregex.test(textval) ? false : true
}
/**
* 验证用户名
*/
export function calidateUser(user){
  let reg = /^([a-zA-Z-z0-9\.]){1,10}$/;
  return !reg.test(user) ? false : true
}
/********************
* 验证手机号
*/
export function calidatePhone(user){
let reg = /^1[3-9][0-9]{9}$/;
return !reg.test(user) ? false : true
}
/********************
* 年龄
*/
export function calidateage(user){
let reg = /^[0-9]{1,2}$/;
return !reg.test(user) ? false : true
}
/**
* 验证密码
*/
export function calidatePassword (pass){
 let reg = /^[a-zA-Z0-9\.-]{1,20}$/
 return !reg.test(pass) ? false : true
}
/****
* 验证邮箱
*/
export function calidateEmail(email){
let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;                                                                 ///^([a-zA-Z]|[0-9])(\w)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
return !reg.test(email) ? false : true
}
/****
* 验证姓名
*/
export function chineseName(email){
let reg = /^[\u4e00-\u9fa5]+$/;
return !reg.test(email) ? false : true
}
/****
* 固定电话
*/
export function chineselin(email){
let reg =/^\d{3}-\d{7,8}|\d{4}-\d{7,8}$/;
return !reg.test(email) ? false : true
}
/****
* 字母 数字 数学符号
*/
export function RegularSign(email){
let reg =/^[a-z_A-Z0-9-\.!@#\$%\\\^&\*\)\(\+=\{\}\[\]\/",'℃<>~\·`\?:;|]+$/;
return !reg.test(email) ? false : true
}
/****
* 同时验证座机和手机
*/
export function SeatHand(email){
let reg =/^((0\d{2,4}-\d{1,8})|(1[3-9][0-9]{9}))$/;
return !reg.test(email) ? false : true
}
