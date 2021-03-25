<script lang="ts">
  import PersonList from '../COMPONENTS/PersonList.svelte'

  import LoadingSpinner from '../UI/LoadingSpinner.svelte'
  import Error from '../UI/Error.svelte'

  import { scriptRun } from '../COMPONENTS/scriptRun.js'

  let people = []
  let getPeople = scriptRun('getSheet', 'People').then(result => {
    people = JSON.parse(result)
    return people
  })
</script>

<main class="mx-auto mt-2">
  {#await getPeople}
    <LoadingSpinner />
  {:then data}
    <PersonList {people} />
  {:catch error}
    <Error message={error} on:cancel={() => console.log(error)} />
  {/await}
</main>
