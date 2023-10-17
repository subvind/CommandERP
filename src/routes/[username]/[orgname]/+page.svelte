<script lang="ts">
  import { onMount } from "svelte";

  import Settings from '$lib/organizations/Settings.svelte'
  import Showcases from '$lib/organizations/Showcases.svelte'
  import Buckets from '$lib/organizations/Buckets.svelte'
  import Files from '$lib/organizations/Files.svelte'
  import OrgPhoto from "$lib/organizations/OrgPhoto.svelte";
  import Code from "$lib/Code.svelte";
  import CreateOrganization from "$lib/users/CreateOrganization.svelte";
  import Delete from "$lib/organizations/Delete.svelte";
  import Accounts from "$lib/organizations/Accounts.svelte";

  export let data: any;
  let user: any = null;
  let organization: any = null;
  let section: any = '';
  
  onMount(async () => {
    // It retrieves the hash value from the URL and assigns it to the variable.
    function getHashValue() {
      return window.location.hash.substring(1); // Removes the "#" character
    }
    section = getHashValue() || 'profile';
    
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
      {#if organization}
        <a href="#" class="brand-logo black-text">{organization.displayName}</a>
      {:else}
        <a href="#" class="brand-logo black-text">Loading...</a>
      {/if}
      <a href="#" data-target="3rd-party-mobile" class="right dropdown-trigger black-text hide-on-large-only"><i class="material-icons">more_horiz</i></a>
      <ul id="3rd-party-mobile" class="dropdown-content">
        {#if organization && organization.ebayUser}
          <li><a class="black-text" href={`https://www.ebay.com/usr/${organization.ebayUser}`} target="_blank">eBay</a></li>
        {/if}
        {#if organization && organization.etsyShop}
          <li><a class="black-text" href={`https://www.etsy.com/shop/${organization.etsyShop}`} target="_blank">Etsy</a></li>
        {/if}
      </ul>

      <ul id="nav-mobile" class="right hide-on-med-and-down">
        {#if organization && organization.ebayUser}
          <li><a class="black-text" href={`https://www.ebay.com/usr/${organization.ebayUser}`} target="_blank">eBay</a></li>
        {/if}
        {#if organization && organization.etsyShop}
          <li><a class="black-text" href={`https://www.etsy.com/shop/${organization.etsyShop}`} target="_blank">Etsy</a></li>
        {/if}
        {#if organization && organization.youtubeChannel}
          <li><a class="black-text" href={`https://youtube.com/${organization.youtubeChannel}`} target="_blank">YouTube</a></li>
        {/if}
      </ul>
    </div>
    <div class="nav-content">
      {#if organization}
        <ul class="tabs tabs-transparent black lighten-2">
          <li class="tab">
            <a class="active" href="#profile" on:click={() => section = 'profile'}>
              {organization.orgname}
            </a>
          </li>
          <li class="tab"><a href="#suppliers" on:click={() => section = 'suppliers'}>suppliers</a></li>
          <li class="tab"><a href="#employees" on:click={() => section = 'employees'}>employees</a></li>
          <li class="tab"><a href="#customers" on:click={() => section = 'customers'}>customers</a></li>
        </ul>
      {/if}
    </div>
  </div>
</nav>

<div class="container">
  <div class="card main">
    {#if organization && section === 'profile'}
      <div id="profile" class="col s12">
        <div class="card-content">
          <p>raw data:</p>
          <Code text={JSON.stringify(organization, null, 2)} lang="json" />
        </div>
      </div>
    {/if}
    {#if organization && section === 'suppliers'}
      <div id="suppliers" class="col s12">
        <Accounts organization={organization} type="supplier" />
      </div>
    {/if}
    {#if organization && section === 'employees'}
      <div id="employees" class="col s12">
        <Accounts organization={organization} type="employee" />
      </div>
    {/if}
    {#if organization && section === 'customers'}
      <div id="customers" class="col s12">
        <Accounts organization={organization} type="customer" />
      </div>
    {/if}
  </div>
</div>

<div class="container">
  {#if organization}
    <ul class="tabs tabs-transparent black lighten-2">
      <li class="tab"><a href="#orgphoto" on:click={() => section = 'orgPhoto'}>orgPhoto</a></li>
      <li class="tab"><a href="#showcases" on:click={() => section = 'showcases'}>showcases</a></li>
      <li class="tab"><a href="#buckets" on:click={() => section = 'buckets'}>buckets</a></li>
      <li class="tab"><a href="#files" on:click={() => section = 'files'}>files</a></li>
    </ul>
  {/if}
  
  <div class="card main">
    <div id="orgphoto" class="col s12">
      {#if organization && section === 'orgPhoto'}
        <OrgPhoto data={data} organization={organization} />
      {/if}
    </div>
    <div id="showcases" class="col s12">
      {#if organization && section === 'showcases'}
        <Showcases organization={organization} />
      {/if}
    </div>
    <div id="buckets" class="col s12">
      {#if organization && section === 'buckets'}
        <Buckets organization={organization} />
      {/if}
    </div>
    <div id="files" class="col s12">
      {#if organization && section === 'files'}
        <Files organization={organization} />
      {/if}
    </div>
  </div>

  {#if organization && user}
    <div class="controls">
      <Settings user={user} organizationId={organization.id} />
    </div>
    <div class="controls">
      <CreateOrganization userId={user.id} />
    </div>
    <div class="controls">
      <Delete organization={organization} />
    </div>
  {/if}

  {#if !organization}
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