<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { fly, fade } from 'svelte/transition'

  export let modalTitle

  const dispatch = createEventDispatcher()

  function closeModal() {
    dispatch('cancel')
  }
</script>

<div class="fixed inset-0 z-10 w-full h-full bg-gray-400 bg-opacity-75" on:click={closeModal} />
<div
  in:fly={{ y: 200, duration: 1000 }}
  out:fade
  class="fixed top-0 z-20 flex flex-col w-full max-w-lg mt-12 bg-red-400 rounded-lg md:m-16"
>
  <h2 class="py-3 text-2xl font-semibold text-center text-gray-800">{modalTitle}</h2>
  <div class="mt-3">
    <slot />
  </div>
  <span on:click={closeModal} class="absolute top-0 right-0 px-2 pt-2">
    <svg
      class="w-12 h-12 text-gray-700 fill-current stroke-current hover:text-gray-200"
      role="button"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
    >
      <path
        d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1
        1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2
        0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
      />
    </svg>
  </span>
</div>
