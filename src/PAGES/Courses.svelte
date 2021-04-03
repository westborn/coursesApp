<script lang="ts">
  import CourseCard from '../COMPONENTS/CourseCard.svelte'
  import CourseList from '../COMPONENTS/CourseList.svelte'

  import LoadingSpinner from '../UI/LoadingSpinner.svelte'
  import Error from '../UI/Error.svelte'

  import { scriptRun } from '../COMPONENTS/scriptRun.js'

  function calendarReturned(data) {
    // TODO -select the calendar to write selecetd entries to
    //      -retrieve current entries
    //      -update existing and/or create new
  }

  function addCoursesToCalendar(event) {
    selectedCourses = event.detail
    try {
      scriptRun('getAllCalendars').then(result => {
        listOfCalendars = result
      })
    } catch {
      console.log('running local - no calendar selected')
    }
    courseState = 'addToCalendar'
  }

  // let getCourses = scriptRun('getSheet', 'Courses').then(result => {
  //   courses = JSON.parse(result)
  //   return courses
  // })

  let courseState = 'selectCourses'
  let selectedCourses = []
  let listOfCalendars = []
</script>

<main class="mx-auto mt-2">
  <!-- Display the Courses list and allow selection to add them to a calendar -->
  {#if courseState === 'selectCourses'}
    {#await scriptRun('getSheet', 'Courses')}
      <LoadingSpinner />
    {:then courses}
      <CourseList {courses} on:createCalendarEntries={addCoursesToCalendar} />
      <div class="mt-24" />
      <!-- container for all cards -->
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {#each courses as course}
          <CourseCard {course} />
        {/each}
      </div>
    {:catch error}
      <Error message={error} on:cancel={() => console.log(error)} />
    {/await}
  {/if}

  <!-- Process selected enties and create calendar entries for them -->
  {#if courseState === 'addToCalendar'}
    <div class="text-2xl">
      <pre>{JSON.stringify(selectedCourses, null,2)}</pre>
      <pre>{JSON.stringify(listOfCalendars, null,2)}</pre>
    </div>
    <button class="m-4 btn btn-primary" on:click={() => (courseState = 'selectCourses')}> Cancel </button>
  {/if}
</main>
