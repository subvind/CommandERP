<script lang="ts">
  import { onMount } from "svelte";

  import Header from "$lib/Header.svelte"
  import Footer from "$lib/Footer.svelte"

  onMount(() => {
    // todo: auto signin person as john doe
    // if stayLogout = true in the cache
  })
</script>

<Header />

<slot />

<Footer />


<style>
  :global(body) {
    background: #eee;
  }
</style>