/**
 * Take the google.script.run function and promisify it.
 * @see https://sites.google.com/a/mcpher.com/share/Home/excelquirks/gassnips/googlescriptruntidy
 *
 * @param  {any} func - [ '{String} functionName', args for the function,,,,,]
 *
 */
import { mockIfLocal } from '../SECRET/DATA.js'

export function scriptRun(func) {
  // this is a trick to convert the arguments array into an array, and drop the first one
  var runArgs = Array.prototype.slice.call(arguments).slice(1)

  const LOCAL = window.location.href.includes('localhost') ? true : false

  // if we're running on localhost then mock the data returned
  if (LOCAL) {
    return mockIfLocal(func, runArgs)
  } else {
    return new Promise(function (resolve, reject) {
      google.script.run
        .withSuccessHandler(function (result) {
          resolve(JSON.parse(result))
        })
        .withFailureHandler(function (error) {
          reject(error)
        })
        [func].apply(this, runArgs)
    })
  }
}
