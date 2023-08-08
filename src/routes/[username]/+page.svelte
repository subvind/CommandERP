<script lang="ts">
  import { onMount } from "svelte";

  import Settings from '$lib/users/Settings.svelte'
  import Organizations from '$lib/users/Organizations.svelte'

  export let data: any;
  let user: any = null;

  onMount(async () => {
		let elms = document.querySelectorAll('.tabs')
    var instance = M.Tabs.init(elms, {});

    const response = await fetch(`https://backend.subvind.com/users/username/${data.username}`, {
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
  })
</script>

<nav class="nav-extended yellow lighten-2">
  <div class="container">
    <div class="nav-wrapper">
      {#if user}
        <a href="#" class="brand-logo black-text">{user.username} ({user.firstName} {user.lastName})</a>
      {/if}
      <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li><a class="black-text" href="collapsible.html">YouTube</a></li>
        <li><a class="black-text" href="collapsible.html">Twitter</a></li>
        <li><a class="black-text" href="collapsible.html">LinkedIn</a></li>
        <li><a class="black-text" href="collapsible.html">Github</a></li>
      </ul>
    </div>
    <div class="nav-content">
      <ul class="tabs tabs-transparent black lighten-2">
        <li class="tab"><a class="active" href="#test1">profile</a></li>
        <li class="tab"><a href="#test4">organizations</a></li>
        <li class="tab"><a href="#test2">followers</a></li>
        <li class="tab"><a href="#test3">following</a></li>
        {#if user}
          <div class="right" style="margin: 0.5em 0;"><Settings userId={user.id} /></div>
        {/if}
      </ul>
    </div>
  </div>
</nav>

<ul id="navigation" class="sidenav">
  <li><a href="sass.html">Sass</a></li>
  <li><a href="badges.html">Components</a></li>
  <li><a href="collapsible.html">JavaScript</a></li>
</ul>

<div class="container">
  <div class="card main">
    <div id="test1" class="col s12">
      {JSON.stringify(user, null, 2)}
      test
    </div>
    <div id="test2" class="col s12">Test 2</div>
    <div id="test3" class="col s12">Test 3</div>
    <div id="test4" class="col s12"><Organizations user={user} /></div>
    
  </div>
</div>

<style>
  .main {
    margin-top: 0;
    background: #aaa;
  }
</style>