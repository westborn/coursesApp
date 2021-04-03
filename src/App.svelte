<script lang="ts">
  import Tailwind from './Tailwind.svelte'
  import CoursesPage from './PAGES/Courses.svelte'
  import EnrollmentsPage from './PAGES/Enrollments.svelte'
  import SessionsPage from './PAGES/Sessions.svelte'
  import StatusPage from './PAGES/Status.svelte'
  import PeoplePage from './PAGES/People.svelte'
  import ColorsPage from './PAGES/Colors.svelte'

  const webpages = [
    { name: 'Courses', component: CoursesPage, color: 'primary-base' },
    { name: 'Enrollments', component: EnrollmentsPage, color: 'blue' },
    { name: 'Sessions', component: SessionsPage, color: 'secondary-base' },
    { name: 'Status', component: StatusPage, color: 'secondary-400' },
    { name: 'People', component: PeoplePage, color: 'blue-400' },
    { name: 'Colors', component: ColorsPage, color: 'gray-200' },
  ]

  // Loads an object in webpages array
  let selectedPage = webpages[0]

  // Have to use obj as arg. so value can be a class
  const loadPage = obj => (selectedPage = obj)
</script>

<Tailwind />
<div class="max-w-screen-lg p-4 container-lg ">
  {#each webpages as webpage}
    <button
      class="mr-5 mb-2 {webpage.name === selectedPage.name ? 'btn btn-gray' : 'btn btn-gray bg-gray-100'} "
      title={webpage.name}
      on:click={() => loadPage(webpage)}
    >
      {webpage.name}
    </button>
  {/each}
  <div class="px-4 rounded-md {`bg-${selectedPage.color}`}">{selectedPage.name}</div>

  <!-- Loaded component/webpage -->
  <svelte:component this={selectedPage.component} />
</div>
