<script lang="ts">
  import { onMount } from 'svelte';
  import jwt_decode from 'jwt-decode';

  import Sidebar from "./Sidebar.svelte"

  let decodedToken: any = null;
  let user: any;
  let loading = true;

  async function load() {
    const response = await fetch(`https://api.subvind.com/users/username/${decodedToken.username}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.ok) {
      user = await response.json();
    } else {
      const errorData = await response.json();
      alert(errorData.error);
    }
  }

  onMount(async () => {
    let accessToken: any = localStorage.getItem('access_token');

    // Decode the JWT
    decodedToken = jwt_decode(accessToken);

    await load()
    setTimeout(load, 1000) // load again for defaultOrganization change

    loading = false;
  })
</script>

<nav class="black">
  <div class="nav-wrapper">
    {#if user}
      {#if user.defaultOrganization}
        <Sidebar username={decodedToken.username} orgname={user.defaultOrganization.orgname} />
      {:else}
        <ul id="nav-mobile" class="left hide-on-med-and-down">
          <li><a href={`/${decodedToken.username}#organizations`}>select organization</a></li>
        </ul>
      {/if}
    {:else}
      {#if loading === false}
        <ul id="nav-mobile" class="left hide-on-med-and-down">
          <li><a href="https://subvind.com">subvind.com</a></li>
        </ul>
      {/if}
    {/if}
    
    <a href="/" class="brand-logo center"><span class="yellow">nomy</span>.<span class="green">E</span><span class="red">R</span><span class="blue">P</span></a>

    {#if user}
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li><a href="/users"><span class="yellow">users</span></a></li>
        <li><a href={`/${decodedToken.username}`}>{decodedToken.fullName}</a></li>
        <li><a href="/organizations"><span class="yellow">organizations</span></a></li>
        {#if user.defaultOrganization}
          <li><a href={`/${decodedToken.username}/${user.defaultOrganization.orgname}`}>{user.defaultOrganization.displayName}</a></li>
        {/if}
      </ul>
    {:else}
      {#if loading === false}
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li><a href="/auth/login">login</a></li>
          <li><a href="/auth/register">register</a></li>
        </ul>
      {/if}
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