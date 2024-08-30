/**
 * An array of routes that are accessible to the public
 * These routes are not protected by the auth middleware
 * @type {string[]}
 */
export const publicRoutes = ["/"];

/**
 * An array of routes that are considered private
 * These routes are protected by the auth middleware
 * @type {string[]}
 */
export const privateRoutes = ["/me"];

/**
 * An array of routes that are considered private
 * These routes are protected by the auth middleware
 * @type {string[]}
 */

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/";
