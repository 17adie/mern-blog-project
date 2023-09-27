import { useCookies } from 'react-cookie';

export function useCookie(cookieName) {
  const [cookies, setCookie, removeCookie] = useCookies([cookieName]);

  const getCookieValue = cookies[cookieName] || null;

  const setCookieValue = (value, options) => {
    setCookie(cookieName, value, options);
  };

  const deleteCookieValue = (options) => {
    removeCookie(cookieName, options);
  };

  return {
    cookieValue: getCookieValue,
    setCookie: setCookieValue,
    deleteCookie: deleteCookieValue,
  };
}