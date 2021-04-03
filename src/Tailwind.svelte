<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  @layer components {
    .btn {
      @apply inline-block px-5 py-3 text-sm font-semibold tracking-wider capitalize rounded-lg focus:ring focus:ring-offset-2 sm:text-base focus:outline-none;
    }
    .btn-primary {
      @apply text-white bg-primary-base hover:bg-primary-600 focus:ring-primary-500 focus:ring-opacity-50 active:bg-primary-600;
    }
    .btn-secondary {
      @apply text-white bg-secondary-base hover:bg-secondary-500 focus:ring-secondary-500 focus:ring-opacity-50 active:bg-secondary-600;
    }
    .btn-gray {
      @apply text-gray-800 bg-gray-300 hover:bg-gray-200 focus:ring-gray-300 focus:ring-opacity-50 active:bg-gray-400;
    }
  }
</style>
