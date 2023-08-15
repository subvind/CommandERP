<script lang="ts">
  import Header from "$lib/information/Header.svelte"
</script>

<Header />

<slot />



<style>
  :global(body) {
    background: #eee;
  }
</style>