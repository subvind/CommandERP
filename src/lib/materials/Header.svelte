<script lang="ts">
  import Sidebar from "./Sidebar.svelte"
</script>

<nav class="black">
  <div class="nav-wrapper">
    <a href="/organizations/acme/suppliers" class="brand-logo left">suppliers</a>
    <a href="/organizations/acme/employees" class="brand-logo center">employees</a>
    <a href="/organizations/acme/customers" class="brand-logo right">customers</a>
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