/**
 * @function dateFormat
 * @description 日期按格式转换为时间字符串(如：YYYY-mm-dd HH:MM表示2019-06-06 19:45)
 * @export
 * @param {string} fmt
 * @param {Date} date
 * @returns {string}
 * @update 2019/12/25 10:39
 * @version 1.0.0
 */
export function dateFormat(fmt: string, date: Date): string {
  if (date instanceof Date) {
    let ret: RegExpMatchArray | null;
    const opt: any = {
      'Y+': date.getFullYear().toString(),
      'm+': (date.getMonth() + 1).toString(),
      'd+': date.getDate().toString(),
      'H+': date.getHours().toString(),
      'M+': date.getMinutes().toString(),
      'S+': date.getSeconds().toString()
    };
    for (const k in opt) {
      ret = new RegExp('(' + k + ')').exec(fmt);
      if (ret) {
        fmt = fmt.replace(ret[1], (ret[1].length === 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, '0')))
      }
    }
    return fmt;
  } else {
    return date;
  }
}

/**
 * @function normalDateTime
 * @description 日期无分割符字符串加入分割符：如20191205101010 -> 2019/12/05 10:10:10
 * @export
 * @param {string} value
 * @param {string} linkChar
 * @returns {string}
 * @update 2019/12/25 10:39
 * @version 1.0.0
 */
export function normalDateTime(value: string, linkChar = '/:'): string {
  if (!value) {
    return '';
  }

  const hyphen = linkChar.substr(0, 1);
  const colon = linkChar.substr(1, 1);

  const year = value.substring(0, 4);
  const month = value.substring(4, 6);
  const date = value.substring(6, 8);

  const hour = value.substring(8, 10);
  const minute = value.substring(10, 12);
  const second = value.substring(12, 14);

  return year + hyphen + month + hyphen + date + ' ' + hour + colon + minute + colon + second;
}

export function normalDate(value: string, linkChar = '/'): string {
  if (!value) {
    return '';
  }
  const year = value.substring(0, 4);
  const month = value.substring(4, 6);
  const date = value.substring(6, 8);

  return [year, month, date].filter(item => item).join(linkChar);
}

export function normalTime(value: string, linkChar = ':'): string {
  if (!value) {
    return '';
  }
  const hour = value.substring(0, 2);
  const minute = value.substring(2, 4);
  const second = value.substring(4, 6);

  return [hour, minute, second].filter(item => item).join(linkChar);
}

/**
 * @decription 将日期字符串转化为日期对象
 * @param { String } dateStr - 日期字符串，格式：20180808
 */
export function stringToDate(dateStr: any) {
  const year = dateStr.substring(0, 4);
  const month = +dateStr.substring(4, 6) - 1;
  const date = dateStr.substring(6, 8);
  return new Date(year, month, date);
}

/**
 * @decription 将日期字符串进行裁剪
 * @param { String } dateStr - 日期字符串，格式：YYYY-mm-dd
 * @param { String } format - 日期字符串，如：YYYY-mm
 */
export function stringDateCut(dateStr: string, format = 'YYYY-mm') {
  return dateFormat(format, new Date(dateStr.replace(/-/g, '/')));
}
