<script lang="ts">
  import { onMount } from "svelte";

  import SubHeader from "$lib/SubHeader.svelte"
  import Footer from "$lib/Footer.svelte"

  onMount(() => {
    // todo: auto signin person as john doe
    // if stayLogout = true in the cache
  })
</script>

<SubHeader />

<slot />

<Footer />


<style>
  :global(body) {
    background: #eee;
  }
</style>