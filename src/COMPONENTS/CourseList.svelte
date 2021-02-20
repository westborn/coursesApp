<script>
  export let courses

  let sortedCourseData = courses
  let selectedSortBy = 'title'
  let ascendingOrder = true

  // SORT BY STRINGs
  const sortByString = sortField => {
    sortedCourseData = sortedCourseData.sort((obj1, obj2) => {
      if (obj1[sortField] < obj2[sortField]) {
        return -1
      } else if (obj1[sortField] > obj2[sortField]) {
        return 1
      }
      return 0 //string code values are equal
    })
    if (!ascendingOrder) {
      sortedCourseData = sortedCourseData.reverse()
    }
    selectedSortBy = sortField
  }
</script>

<table class="text-sm divide-y divide-gray-200 table-auto max-w-1024">
  <tr>
    <th class="w-1/12 text-left" on:click={() => sortByString('courseStatus')}>
      <span class="px-2 font-semibold rounded-full bg-u3a-green-400"> Status </span>
      {#if selectedSortBy === 'courseStatus'}
        <span on:click={() => (ascendingOrder = !ascendingOrder)}>
          {@html ascendingOrder ? '&#9661;' : '&#9651;'}
        </span>
      {/if}
    </th>
    <th class="w-4/12 text-left" on:click={() => sortByString('title')}>
      <span class="px-2 font-semibold rounded-full bg-u3a-green-400"> Title </span>
      {#if selectedSortBy === 'title'}
        <span on:click={() => (ascendingOrder = !ascendingOrder)}>
          {@html ascendingOrder ? '&#9661;' : '&#9651;'}
        </span>
      {/if}
    </th>
    <th class="w-2/12 max-w-xs text-left">Presenter</th>
    <th class="w-2/12 text-left">Liason</th>
    <th class="w-1/12 text-left">Min </th>
    <th class="w-1/12 text-left">Max </th>
    <th class="w-1/12 text-left">Cost</th>
  </tr>

  {#each sortedCourseData as course}
    <tr>
      <td>{course.courseStatus}</td>
      <td>{course.title}</td>
      <td>{course.presenter || ''}</td>
      <td>{course.liason || ''}</td>
      <td>{course.minimumEnrolments || ''}</td>
      <td>{course.maximumEnrolments || ''}</td>
      <td>{course.cost || ''}</td>
    </tr>
  {/each}
</table>
