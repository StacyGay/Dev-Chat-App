export class CookieUtils {
    static getCookie(cname: string): string {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');

        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }

            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }

        return "";
    }

    static setCookie(key: string, value: string, minutesUntilExpire: number = 15) {
        var expires = "";
        if (minutesUntilExpire) {
            var date = new Date();
            date.setTime(date.getTime() + (minutesUntilExpire * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = key + "=" + (value || "")  + expires + "; path=/";
    }

    static eraseCookie(key: string) {
        document.cookie = key + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
}
