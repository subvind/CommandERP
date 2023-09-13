<script lang="ts">
  import { onMount } from "svelte";

  import Settings from '$lib/users/Settings.svelte'
  import Organizations from '$lib/users/Organizations.svelte'
  import Code from "$lib/Code.svelte";

  export let data: any;
  let user: any = null;

  onMount(async () => {
    const response = await fetch(`https://api.subvind.com/users/username/${data.username}`, {
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

    setTimeout(() => {
      let elms = document.querySelectorAll('.tabs')
      var instance = M.Tabs.init(elms, {});
    }, 0)

    var elems = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(elems, {});
  })
</script>

<nav class="nav-extended yellow lighten-2">
  <div class="container">
    <div class="nav-wrapper">
      {#if user}
        <a href="#" class="brand-logo black-text">{user.firstName} {user.lastName}</a>
      {/if}
      <a href="#" data-target="social-mobile" class="right dropdown-trigger black-text hide-on-large-only"><i class="material-icons">more_horiz</i></a>
      <ul id="social-mobile" class="dropdown-content">
        {#if user && user.twitter}
          <li><a class="black-text" href={`https://twitter.com/${user.twitter}`} target="blank">Twitter</a></li>
        {/if}
        {#if user && user.youtube}
          <li><a class="black-text" href={`https://youtube.com/${user.youtube}`} target="blank">YouTube</a></li>
        {/if}
      </ul>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        {#if user && user.twitter}
          <li><a class="black-text" href={`https://twitter.com/${user.twitter}`} target="blank">Twitter</a></li>
        {/if}
        {#if user && user.youtube}
          <li><a class="black-text" href={`https://youtube.com/${user.youtube}`} target="blank">YouTube</a></li>
        {/if}
      </ul>
    </div>
    <div class="nav-content">
      <ul class="tabs tabs-transparent black lighten-2">
        {#if user}
          <li class="tab">
            <a class="active" href="#profile">
              {user.username}
            </a>
          </li>
        {/if}
        <li class="tab"><a href="#organizations">organizations</a></li>
        <!-- <li class="tab"><a href="#followers">followers</a></li> -->
        <!-- <li class="tab"><a href="#following">following</a></li> -->
      </ul>
    </div>
  </div>
</nav>

{#if user}
  <div class="container">
    <div class="card main">
      <div id="profile" class="col s12">
        <div class="card-content">
          <p>raw data:</p>
          <Code text={JSON.stringify(user, null, 2)} lang="json" />
        </div>
      </div>
      <div id="organizations" class="col s12">
        <Organizations user={user} />
      </div>
      <!-- <div id="followers" class="col s12">followers</div> -->
      <!-- <div id="following" class="col s12">following</div>   -->
    </div>

    {#if user}
      <div class="controls">
        <Settings userId={user.id} />
      </div>
      <div class="controls">
        <!-- do nothing -->
      </div>
    {/if}
  </div>
{/if}

<style>
  .main {
    margin-top: 0;
    background: #aaa;
  }

  .controls {
    margin: 0 0.5em 0.5em 0;
  }
</style>