<script lang="ts">
  import { onMount } from "svelte";

  import Settings from '$lib/showcases/Settings.svelte'
  import BannerPhoto from "$lib/showcases/BannerPhoto.svelte";
  import Code from "$lib/Code.svelte";
  import CreateShowcase from "$lib/organizations/CreateShowcase.svelte";

  export let data: any;
  let user: any = null;
  let organization: any = null;
  let showcase: any = null;
  let section: any = '';

  onMount(async () => {
    // It retrieves the hash value from the URL and assigns it to the variable.
    function getHashValue() {
      return window.location.hash.substring(1); // Removes the "#" character
    }
    section = getHashValue() || 'profile';

    /**
     * set to default organization if
     * user is owner or employee of org
     */
    try {
      const response = await fetch(`https://api.subvind.com/users/defaultOrganization/${data.username}/${data.orgname}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        let res = await response.json();

        console.log('res', res)
      } else {
        const errorData = await response.json();
        alert(errorData.message);
      }
    } catch (error) {
      console.error('Error featching defaultOrganization:', error);
      alert('An error occurred during defaultOrganization.');
    }
    
    /**
     * fetch user
     */
    const responseUser = await fetch(`https://api.subvind.com/users/username/${data.username}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (responseUser.ok) {
      user = await responseUser.json();
    } else {
      const errorData = await responseUser.json();
      alert(errorData.error);
    }

    /**
     * fetch org
     */
    const responseOrg = await fetch(`https://api.subvind.com/organizations/orgname/${data.orgname}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (responseOrg.ok) {
      organization = await responseOrg.json();

    } else {
      const errorData = await responseOrg.json();
      alert(errorData.error);
    }

    /**
     * fetch showcase
     */
    const responseShowcase = await fetch(`https://api.subvind.com/showcases/${data.showcaseId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (responseShowcase.ok) {
      showcase = await responseShowcase.json();
    } else {
      const errorData = await responseShowcase.json();
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
      {#if organization && showcase}
        <ul id="nav-mobile" class="left">
          <li>
            <a href={`/${organization.owner.username}/${organization.orgname}`} class="black-text">{organization.displayName}</a>
          </li>
          <li>
            <a href="#" class="black-text">{showcase.title}</a>
          </li>
        </ul>
      {:else}
        <a href="#" class="brand-logo black-text">Loading...</a>
      {/if}
    </div>
    <div class="nav-content">
      {#if showcase}
        <ul class="tabs tabs-transparent black lighten-2">
          <li class="tab">
            <a class="active" href="#profile" on:click={() => section = 'profile'}>
              {showcase.title}
            </a>
          </li>
          <li class="tab"><a href="#bannerphoto" on:click={() => section = 'bannerphoto'}>banner photo</a></li>
        </ul>
      {/if}
    </div>
  </div>
</nav>

<div class="container">
  <div class="card main">
    {#if showcase && section === 'profile'}
      <div id="profile" class="col s12">
        <div class="card-content">
          <p>raw data:</p>
          <Code text={JSON.stringify(showcase, null, 2)} lang="json" />
        </div>
      </div>
    {/if}
    {#if showcase && organization && section === 'bannerphoto'}
      <div id="bannerphoto" class="col s12">
        <BannerPhoto data={data} showcase={showcase} organization={organization} />
      </div>
    {/if}
  </div>

  {#if showcase && organization}
    <div class="controls">
      <Settings user={user} showcaseId={showcase.id} />
    </div>
    <div class="controls">
      <CreateShowcase organizationId={organization.id} />
    </div>
  {/if}

  {#if !showcase}
    <br />
    <br />
    <br />
    <!-- show loading indicator -->
    <div class="progress red lighten-2">
      <div class="indeterminate teal lighten-2"></div>
    </div>
  {/if}
</div>

<style>
  .main {
    margin-top: 0;
    background: #aaa;
  }

  .controls {
    margin: 0 0.5em 0.5em 0;
  }
</style>