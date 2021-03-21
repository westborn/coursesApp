<script lang="ts">
  import { onMount } from 'svelte'

  // import PersonCard from '../COMPONENTS/PersonCard.svelte'
  import PersonList from '../COMPONENTS/PersonList.svelte'

  import LoadingSpinner from '../UI/LoadingSpinner.svelte'
  import Error from '../UI/Error.svelte'

  import { PEOPLE } from '../SECRET/DATA.js'

  const LOCAL = true

  onMount(() => {
    if (LOCAL) {
      console.log('LOCAL')
      people = [...PEOPLE]
      setTimeout(() => (loading = false), 200)
    } else {
      console.log('SPREADSHEET')
      /* @ts-ignore */
      google.script.run.withSuccessHandler(populatePeople).getSheet('People')
    }
  })

  function populatePeople(data) {
    people = JSON.parse(data)
    loading = false
  }

  function clearError() {
    error = null
  }

  let loading = true
  let error = null
  // let error = { message: 'error text' }
  let people = []
</script>

<main class="mx-auto mt-2">
  {#if error}
    <Error message={error.message} on:cancel={clearError} />
  {/if}

  {#if loading}
    <LoadingSpinner />
  {:else}
    <PersonList {people} />
    <!-- Spacer to keep componets away from each other -->
    <div class="mt-24" />

    <!-- container for all cards -->
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {#each people as person}
        <!-- <PersonCard {person} /> -->
      {/each}
    </div>
    <!-- container for List -->
  {/if}
</main>
