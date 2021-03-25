<script>
  export let people

  let sortedPersonData = people
  let selectedSortBy = 'surname'
  let ascendingOrder = true

  const sortByStringTwoFields = (sortField1, sortField2) => {
    sortedPersonData = sortedPersonData.sort((a, b) => {
      return a[sortField1].localeCompare(b[sortField1]) || a[sortField2].localeCompare(b[sortField2])
    })
    if (!ascendingOrder) {
      sortedPersonData = sortedPersonData.reverse()
    }
    selectedSortBy = sortField1
  }
</script>

<table class="text-sm divide-y divide-gray-200 table-auto max-w-1024">
  <tr>
    <th class="w-2/12 text-left" on:click={() => sortByStringTwoFields('personStatus', 'surname')}>
      <span
        class="px-2 font-semibold rounded-full bg-u3a-green-400"
        on:click={() => (ascendingOrder = !ascendingOrder)}
      >
        Status
      </span>
      {#if selectedSortBy === 'personStatus'}
        <span>
          {@html ascendingOrder ? '&#9651;' : '&#9661;'}
        </span>
      {/if}
    </th>
    <th class="w-2/12 text-left" on:click={() => sortByStringTwoFields('surname', 'firstName')}>
      <span
        class="px-2 font-semibold rounded-full bg-u3a-green-400"
        on:click={() => (ascendingOrder = !ascendingOrder)}
      >
        Surname
      </span>
      {#if selectedSortBy === 'surname'}
        <span>
          {@html ascendingOrder ? '&#9651;' : '&#9661;'}
        </span>
      {/if}
    </th>
    <th class="w-2/12 text-left" on:click={() => sortByStringTwoFields('firstName', 'surname')}>
      <span
        class="px-2 font-semibold rounded-full bg-u3a-green-400"
        on:click={() => (ascendingOrder = !ascendingOrder)}
      >
        First Name
      </span>
      {#if selectedSortBy === 'firstName'}
        <span>
          {@html ascendingOrder ? '&#9651;' : '&#9661;'}
        </span>
      {/if}
    </th>

    <th class="w-2/12 text-left">Mobile </th>
    <th class="w-2/12 text-left">Phone </th>
    <th class="w-2/12 text-left">Email</th>
  </tr>

  {#each sortedPersonData as person (person.personId)}
    <tr>
      <td>{person.personStatus}</td>
      <td>{person.surname}</td>
      <td>{person.firstName || ''}</td>
      <td>{person.mobile || ''}</td>
      <td>{person.phone || ''}</td>
      <td>{person.email || ''}</td>
    </tr>
  {/each}
</table>
