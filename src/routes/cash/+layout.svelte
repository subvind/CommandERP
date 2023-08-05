<script lang="ts">
  import Header from "$lib/cash/Header.svelte"
</script>

<Header />

<slot />



<style>
  :global(body) {
    background: #eee;
  }
</style>