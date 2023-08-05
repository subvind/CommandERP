<script lang="ts">
  import Sidebar from "./Sidebar.svelte"
</script>

<nav class="black">
  <div class="nav-wrapper">
    <Sidebar />
    <a href="/" class="brand-logo center"><span class="yellow">inom</span>.<span class="green">E</span><span class="red">R</span><span class="blue">P</span></a>
    <ul id="nav-mobile" class="right hide-on-med-and-down">
      <li><a href="/users"><span class="yellow">users</span></a></li>
      <li><a href="/users/test">John Doe</a></li>
      <li><a href="/organizations"><span class="yellow">organizations</span></a></li>
      <li><a href="/organizations/acme">ACME Corp.</a></li>
    </ul>
  </div>
</nav>

<style>
  .yellow {
    color: yellow;
    background-color: transparent !important;
  }
  .green {
    color: green;
    background-color: transparent !important;
  }
  .blue {
    color: #039be5;
    background-color: transparent !important;
  }
  .red {
    color: red;
    background-color: transparent !important;
  }
</style>