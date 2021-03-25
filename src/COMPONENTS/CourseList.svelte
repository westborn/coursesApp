<script>
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()

  export let courses

  let sortedCourseData = courses
  let selectedSortBy = 'title'
  let ascendingOrder = true
  let selectedCourses = []

  const sortByString = sortField => {
    sortedCourseData = sortedCourseData.sort((a, b) => {
      return a[sortField].localeCompare(b[sortField])
    })
    if (!ascendingOrder) {
      sortedCourseData = sortedCourseData.reverse()
    }
    selectedSortBy = sortField
  }
</script>

<button
  class="px-4 py-2 m-4 font-semibold bg-u3a-green-700 rounded-xl hover:bg-u3a-green-900"
  on:click={() => dispatch('createCalendarEntries', selectedCourses)}
>
  Create Calendar entries for selected courses
</button>

<table class="text-sm divide-y divide-gray-200 table-auto max-w-1024">
  <tr>
    <th class="w-2/12 text-left" on:click={() => sortByString('courseStatus')}>
      <span
        class="px-2 font-semibold rounded-full bg-u3a-green-400"
        on:click={() => (ascendingOrder = !ascendingOrder)}
      >
        Status
      </span>
      {#if selectedSortBy === 'courseStatus'}
        <span>
          {@html ascendingOrder ? '&#9651;' : '&#9661;'}
        </span>
      {/if}
    </th>
    <th class="w-4/12 text-left" on:click={() => sortByString('title')}>
      <span
        class="px-2 font-semibold rounded-full bg-u3a-green-400"
        on:click={() => (ascendingOrder = !ascendingOrder)}
      >
        Title
      </span>
      {#if selectedSortBy === 'title'}
        <span>
          {@html ascendingOrder ? '&#9651;' : '&#9661;'}
        </span>
      {/if}
    </th>
    <th class="w-2/12 text-left" on:click={() => sortByString('presenter')}>
      <span
        class="px-2 font-semibold rounded-full bg-u3a-green-400"
        on:click={() => (ascendingOrder = !ascendingOrder)}
      >
        Presenter
      </span>
      {#if selectedSortBy === 'presenter'}
        <span>
          {@html ascendingOrder ? '&#9651;' : '&#9661;'}
        </span>
      {/if}
    </th>

    <th class="w-2/12 text-left">Liason</th>
    <th class="w-1/12 text-left">Min </th>
    <th class="w-1/12 text-left">Max </th>
    <th class="w-1/12 text-left">Cost</th>
  </tr>

  {#each sortedCourseData as course (course.courseId)}
    <tr>
      <td>
        <label class="inline-flex items-center">
          <input
            bind:group={selectedCourses}
            value={course.courseId}
            type="checkbox"
            class="w-4 h-4 rounded form-checkbox bg-u3a-green-200 text-u3a-green-900"
          />
          <span class="ml-2">{course.courseStatus}</span>
        </label>
      </td>
      <td>{course.title}</td>
      <td>{course.presenter || ''}</td>
      <td>{course.liason || ''}</td>
      <td>{course.minimumEnrolments || ''}</td>
      <td>{course.maximumEnrolments || ''}</td>
      <td>{course.cost || ''}</td>
    </tr>
  {/each}
</table>
