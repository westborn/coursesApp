<script lang="ts">
  import PersonList from '../COMPONENTS/PersonList.svelte'

  import LoadingSpinner from '../UI/LoadingSpinner.svelte'
  import Error from '../UI/Error.svelte'

  import { scriptRun } from '../COMPONENTS/scriptRun.js'
</script>

<main class="mx-auto mt-2">
  {#await scriptRun('getSheet', 'People')}
    <LoadingSpinner />
  {:then people}
    <PersonList {people} />
  {:catch error}
    <Error message={error} on:cancel={() => console.log(error)} />
  {/await}
</main>
