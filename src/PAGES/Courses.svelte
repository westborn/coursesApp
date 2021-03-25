<script lang="ts">
  import CourseCard from '../COMPONENTS/CourseCard.svelte'
  import CourseList from '../COMPONENTS/CourseList.svelte'

  import LoadingSpinner from '../UI/LoadingSpinner.svelte'
  import Error from '../UI/Error.svelte'

  import { scriptRun } from '../COMPONENTS/scriptRun.js'

  function doSelectCourses() {
    courseState = 'selectCourses'
  }

  function calendarReturned(data) {
    // TODO -select the calendar to write to.
    //      -retrieve current entries
    //      -update existing and/or create new
    listOfCalendars = [...data]
  }

  function addCoursesToCalendar(event) {
    loading = true
    selectedCourses = event.detail

    try {
      /* @ts-ignore */
      google.script.run.withSuccessHandler(calendarReturned).getCalendarList()
      /* @ts-ignore */
      google.script.run.withSuccessHandler(populateCourses).addCoursesToCalendar(selectedCourses)
    } catch {
      console.log('running local - no calendar selected')
    }

    courseState = 'addToCalendar'
  }

  let courses = []
  let getCourses = scriptRun('getSheet', 'Courses').then(result => {
    courses = JSON.parse(result)
    return courses
  })

  let courseState = 'selectCourses'
  let selectedCourses = []
  let loading = true
  let listOfCalendars = []
</script>

<main class="mx-auto mt-2">
  <!-- Present the Courses list and allow selection to add these to calendar -->
  {#if courseState === 'selectCourses'}
    {#await getCourses}
      <LoadingSpinner />
    {:then data}
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

  <!-- Process selected enties and create calendar entrie for them -->
  {#if courseState === 'addToCalendar'}
    <div class="text-2xl">
      <pre>{JSON.stringify(selectedCourses, null,2)}</pre>
      <pre>{JSON.stringify(listOfCalendars, null,2)}</pre>
    </div>
    <button
      class="px-4 py-2 m-4 font-semibold bg-u3a-green-700 rounded-xl hover:bg-u3a-green-900"
      on:click={() => doSelectCourses()}
    >
      Cancel
    </button>
  {/if}
</main>
