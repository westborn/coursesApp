<script>
  /**
   * Take the google.script.run function and promisify it.
   * @see https://sites.google.com/a/mcpher.com/share/Home/excelquirks/gassnips/googlescriptruntidy
   *
   * @param  {Array} func - [ '{String} functionName', args for the function,,,,,]
   *
   */
  function scriptRun(func) {
    // this is a trick to convert the arguments array into an array, and drop the first one
    var runArgs = Array.prototype.slice.call(arguments).slice(1)

    return new Promise(function (resolve, reject) {
      google.script.run
        .withSuccessHandler(function (result) {
          resolve(result)
        })
        .withFailureHandler(function (error) {
          reject(error)
        })
        [func].apply(this, runArgs)
    })
  }
  let courses
  let getCourses = scriptRun('getSheet', 'Courses').then(x => {
    courses = JSON.parse(x)
    return courses
  })
</script>

{#await getCourses}
  <p>loading</p>
{:then data}
  {#each data as course}
    <li>{course.title}</li>
  {/each}
{:catch error}
  <p style="color: red">Error is:</p>
  <pre>{error}</pre>
{/await}
