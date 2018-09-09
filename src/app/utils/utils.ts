

export class Utils {

  static EMAIL_REGEXP = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;

  static getMonthName(month: number) {
    switch (month) {
      case 0:
        return 'января';
      case 1:
        return 'февраля';
      case 2:
        return 'марта';
      case 3:
        return 'апреля';
      case 4:
        return 'мая';
      case 5:
        return 'июня';
      case 6:
        return 'июля';
      case 7:
        return 'августа';
      case 8:
        return 'сентября';
      case 9:
        return 'октября';
      case 10:
        return 'ноября';
      case 11:
        return 'декабря';
    }
  }

  static getDayWeekName(day: number) {
    switch (day) {
      case 0:
        return 'воскресенье';
      case 1:
        return 'понедельник';
      case 2:
        return 'вторник';
      case 3:
        return 'среда';
      case 4:
        return 'четверг';
      case 5:
        return 'пятница';
      case 6:
        return 'суббота';
    }
  }

  static loadUrl(url) {
    return new Promise((resolve, reject) => {
      let r = false;
      const t = document.getElementsByTagName('script')[0];
      const s = document.createElement('script') as any;

      s.type = 'text/javascript';
      s.src = url;
      s.async = true;
      s.onload = s.onreadystatechange = function () {
        if (!r && (!this.readyState || this.readyState === 'complete')) {
          r = true;
          resolve(this);
        }
      };
      s.onerror = s.onabort = reject;
      t.parentNode.insertBefore(s, t);
    });
  }

  static initYMap() {
    return new Promise((resolve, reject) => {
      Utils.loadUrl('https://api-maps.yandex.ru/2.1/?lang=ru_RU&coordorder=longlat').then(() => {
        resolve((window as any).ymaps);
      }).catch(e => reject(e));
    });
  }

  static isValidEmail(email) {
    return Utils.EMAIL_REGEXP.test(email);
  }
}
