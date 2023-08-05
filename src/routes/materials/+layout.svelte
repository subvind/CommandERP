<script lang="ts">
  import Header from "$lib/materials/Header.svelte"
</script>

<Header />

<slot />



<style>
  :global(body) {
    background: #eee;
  }
</style>