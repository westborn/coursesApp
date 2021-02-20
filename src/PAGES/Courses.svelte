<script lang="ts">
  import { onMount } from 'svelte'

  import CourseCard from '../COMPONENTS/CourseCard.svelte'
  import CourseList from '../COMPONENTS/CourseList.svelte'

  import LoadingSpinner from '../UI/LoadingSpinner.svelte'
  import Error from '../UI/Error.svelte'

  import { COURSES } from '../SECRET/DATA.js'

  const LOCAL = true

  onMount(() => {
    if (LOCAL) {
      console.log('LOCAL')
      courses = [...COURSES]
      setTimeout(() => (loading = false), 600)
    } else {
      console.log('SPREADSHEET')
      /* @ts-ignore */
      google.script.run.withSuccessHandler(populateCourses).getSheet('Courses')
    }
  })

  function populateCourses(data) {
    courses = JSON.parse(data)
    loading = false
  }

  function clearError() {
    error = null
  }

  let loading = true
  let error = null
  // let error = { message: 'error text' }
  let courses = []
</script>

<main class="mx-auto mt-2">
  {#if error}
    <Error message={error.message} on:cancel={clearError} />
  {/if}

  {#if loading}
    <LoadingSpinner />
  {:else}
    <CourseList {courses} />
    <!-- container for all cards -->
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {#each courses as course}
        <CourseCard {course} />
      {/each}
    </div>
    <!-- container for List -->
  {/if}
</main>
