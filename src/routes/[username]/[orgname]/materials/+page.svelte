<script lang="ts">
  
  import { page } from '$app/stores';
  import { onMount } from 'svelte';

  let username;
  let orgname;

  onMount(() => {
    username = $page.params.username;
    orgname = $page.params.orgname;
  });
</script>

ds.kjbnsdjk



<style>
</style>