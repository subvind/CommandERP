<script lang="ts">
  import Sidebar from "./Sidebar.svelte"
</script>

<nav class="black">
  <div class="nav-wrapper">
    <a href="/organizations/acme/suppliers" class="brand-logo left">suppliers &rarr;</a>
    <a href="/organizations/acme/employees" class="brand-logo center">&larr; employees &rarr; </a>
    <a href="/organizations/acme/customers" class="brand-logo right">&rarr;	customers</a>
  </div>
</nav>
<nav class="red darken-2">
  <div class="nav-wrapper">
    <Sidebar />
  </div>
</nav>

<style>
  .brand-logo.left,
  .brand-logo.right {
    margin: 0 0.5em;
  }
</style>