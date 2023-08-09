<script lang="ts">
  import { onMount } from 'svelte';
  import jwt_decode from 'jwt-decode';

  import Sidebar from "./Sidebar.svelte"

  let decodedToken: any = null;

  onMount(() => {
    let accessToken: any = localStorage.getItem('access_token');

    // Decode the JWT
    decodedToken = jwt_decode(accessToken);
  })
</script>

<nav class="black">
  <div class="nav-wrapper">
    {#if decodedToken}
      {#if decodedToken.organization}
        <Sidebar />
      {:else}
        <ul id="nav-mobile" class="left hide-on-med-and-down">
          <li><a href={`/${decodedToken.username}#organizations`}>select organization</a></li>
        </ul>
      {/if}
    {:else}
      <ul id="nav-mobile" class="left hide-on-med-and-down">
        <li><a href="https://subvind.com">subvind.com</a></li>
      </ul>
    {/if}
    
    <a href="/" class="brand-logo center"><span class="yellow">inom</span>.<span class="green">E</span><span class="red">R</span><span class="blue">P</span></a>

    {#if decodedToken}
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li><a href="/users"><span class="yellow">users</span></a></li>
        <li><a href={`/${decodedToken.username}`}>{decodedToken.fullName}</a></li>
        <li><a href="/organizations"><span class="yellow">organizations</span></a></li>
        {#if decodedToken.organization}
          <li><a href={`/${decodedToken.username}/${decodedToken.organization.slug}`}>{decodedToken.organization.name}</a></li>
        {/if}
      </ul>
    {:else}
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li><a href="/auth/login">login</a></li>
        <li><a href="/auth/register">register</a></li>
      </ul>
    {/if}
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