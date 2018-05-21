import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieService {
  isLocal: Boolean = true;
  constructor() {}
  /**
   * 设置cookie
   * @param {string} name
   * @param {string} value
   * @param {number} time minute
   */
  setCookie(name: string, value: string, time: number) {
    const d = new Date();
    d.setTime(d.getTime() + (time * 60 * 1000)); // 换算成毫秒数
    console.log(d);
    const expires = 'expires=' + d.toUTCString();
    document.cookie = name + '=' + value + ';' + expires;
  }

  /**
   * 获取cookie
   * @param {string} name
   * @returns {string}
   */
  getCookie(name: string) {
    const n = name + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      const c = ca[i].trim();
      if (c.indexOf(n) === 0) {
        return c.substring(n.length, c.length);
      }
    }
    return '';
  }

  /**
   * 删除cookie
   * @param {string} name
   */
  delCookie(name: string) {
    document.cookie = `${name}=; expires=2017-12-18T00:00:00.000Z";`;
  }

  /**
   * 设置storage，根据isLocal的真假来判断是存到localStorage还是sessionStorage
   * @param {string} name
   * @param {string} value
   */
  setStorage(name: string, value: string) {
    if (this.isLocal) {
      localStorage.setItem(name, value);
    } else {
      sessionStorage.setItem(name, value);
    }
  }

  /**
   * 获取storage
   * @param {string} name
   * @returns {string}
   */
  getStorage (name: string) {
    if (this.isLocal) {
      return localStorage.getItem(name);
    } else {
      return sessionStorage.getItem(name);
    }
  }
}
