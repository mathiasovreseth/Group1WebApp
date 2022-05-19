// Cookie handling

/**
 * Get value of a specific cookie.
 * Code copied from https://www.w3schools.com/js/js_cookies.asp
 * @param cname Cookie name (key)
 * @returns {string} Value of the cookie or "" if cookie not found
 */
export function getCookie(cname: string) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

/**
 * Store a local cookie
 * Code copied from https://www.w3schools.com/js/js_cookies.asp
 * @param cname Name of the cookie (key)
 * @param cvalue Value of the cookie
 * @param exdays expiry time in days
 */
export function setCookie(cname: string, cvalue: string, exdays: number) {
    const d = new Date();
    d.setTime(d.getTime() + (60  * 24 * 60 * 1000 * exdays));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

/**
 * Delete a cookie
 * @param cookieName Name of the cookie to delete
 */
export function deleteCookie(cookieName: string) {
    setCookie(cookieName, "", -1);
}