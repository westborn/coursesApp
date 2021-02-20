<script lang="ts">
  import Tailwind from './Tailwind.svelte'
  import CoursesPage from './PAGES/Courses.svelte'
  import EnrollmentsPage from './PAGES/Enrollments.svelte'
  import SessionsPage from './PAGES/Sessions.svelte'
  import StatusPage from './PAGES/Status.svelte'
  import ColorsPage from './PAGES/Colors.svelte'

  const webpages = [
    { name: 'Courses', component: CoursesPage, color: 'u3a-green' },
    { name: 'Enrollments', component: EnrollmentsPage, color: 'u3a-blue' },
    { name: 'Sessions', component: SessionsPage, color: 'u3a-orange' },
    { name: 'Status', component: StatusPage, color: 'u3a-orange-400' },
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
      class="{webpage.name === selectedPage.name
        ? 'bg-gray-300'
        : 'bg-gray-100'} p-4 mt-2 mb-2 mr-2 text-gray-900 rounded-lg cursor-pointer focus:outline-none semibold hover:bg-gray-400 "
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
