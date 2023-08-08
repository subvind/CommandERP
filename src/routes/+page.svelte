<script lang="ts">
  import { onMount } from "svelte";

  let accessToken: any = undefined

  onMount(() => {
    accessToken = localStorage.getItem('access_token');
  })
</script>

<br />
<br />
<br />
<div class="container" style="width: 600px;">
  <div class="card">
    <div class="card-content">
      <strong>What is ERP?</strong>
      <h1 style="margin: 0;">Enterprise Resource Planning</h1>
      <br />
      <p>ERP is a system that optomizes the flow of</p>
      <h4 style="margin: 0;">
        <span class="blue">information,</span>
        <span class="red">materials,</span>
        <span class="green">and cash</span>
      </h4>
      <p>in an organization.</p>
      <br />
      {#if accessToken}
        <a href="/auth/logout" class="waves-effect black white-text btn">Logout</a>
      {:else}
        <a href="/auth/login" class="waves-effect black white-text btn">Login</a>
        <a href="/auth/register" class="waves-effect black white-text btn">Register</a>
      {/if}
    </div>
  </div>
</div>

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