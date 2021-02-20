<script lang="ts">
  import Modal from './Modal.svelte'
  export let message
</script>

<Modal modalTitle="An error occurred!" on:cancel>
  <p class="p-4">{message}</p>
</Modal>
