/**
 * Passwords will contain at least 1 upper case letter
 * Passwords will contain at least 1 lower case letter
 * Passwords will contain at least 1 number or special character
 * There is no length validation (min, max) in this regex!
 * @returns RegExp
 */
export function getPasswordRegex(): RegExp {
  return new RegExp('((?=.*\\d)|(?=.*\\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$');

  // return /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
}
