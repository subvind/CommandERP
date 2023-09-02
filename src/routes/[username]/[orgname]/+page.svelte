<script lang="ts">
  import { onMount } from "svelte";

  import Settings from '$lib/organizations/Settings.svelte'
  import Buckets from '$lib/organizations/Buckets.svelte'

  export let data: any;
  let user: any = null;
  let organization: any = null;

  
  onMount(async () => {
    /**
     * set to default organization if
     * user is owner or employee of org
     */
    try {
      const response = await fetch(`https://backend.subvind.com/users/defaultOrganization/${data.username}/${data.orgname}`, {
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
    const responseUser = await fetch(`https://backend.subvind.com/users/username/${data.username}`, {
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
    const responseOrg = await fetch(`https://backend.subvind.com/organizations/orgname/${data.orgname}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (responseOrg.ok) {
      organization = await responseOrg.json();

      setTimeout(() => {
        let elms = document.querySelectorAll('.tabs')
        var instance = M.Tabs.init(elms, {});
      }, 0)
    } else {
      const errorData = await responseOrg.json();
      alert(errorData.error);
    }

    var elems = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(elems, {});
  })
</script>

<nav class="nav-extended yellow lighten-2">
  <div class="container">
    <div class="nav-wrapper">
      {#if organization}
        <a href="#" class="brand-logo black-text">{organization.displayName}</a>
      {/if}
      <a href="#" data-target="3rd-party-mobile" class="right dropdown-trigger black-text hide-on-large-only"><i class="material-icons">more_horiz</i></a>
      <ul id="3rd-party-mobile" class="dropdown-content">
        <li><a class="black-text" href="collapsible.html">eBay</a></li>
        <li><a class="black-text" href="collapsible.html">Etsy</a></li>
        <li><a class="black-text" href="collapsible.html">Stripe</a></li>
        <li><a class="black-text" href="collapsible.html">Twilio</a></li>
      </ul>

      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li><a class="black-text" href="collapsible.html">eBay</a></li>
        <li><a class="black-text" href="collapsible.html">Etsy</a></li>
        <li><a class="black-text" href="collapsible.html">Stripe</a></li>
        <li><a class="black-text" href="collapsible.html">Twilio</a></li>
      </ul>
    </div>
    <div class="nav-content">
      <ul class="tabs tabs-transparent black lighten-2">
        {#if organization}
          <li class="tab">
            <a class="active" href="#profile">
              {organization.orgname}
            </a>
          </li>
        {/if}
        <li class="tab"><a href="#suppliers">suppliers</a></li>
        <li class="tab"><a href="#employees">employees</a></li>
        <li class="tab"><a href="#customers">customers</a></li>

        {#if organization}
          <div class="right" style="margin: 0.5em 0;"><Settings user={user} organizationId={organization.id} /></div>
        {/if}
      </ul>
    </div>
  </div>
</nav>

{#if organization}
  <div class="container">
    <div class="card main">
      <div id="profile" class="col s12">
        {JSON.stringify(organization, null, 2)}
      </div>
      <div id="suppliers" class="col s12">
        suppliers
        <!-- {#if user}
          <Organizations user={user} />
        {/if} -->
      </div>
      <div id="employees" class="col s12">employees</div>
      <div id="customers" class="col s12">customers</div>
      
    </div>
  </div>
{/if}

<div class="container">
  <ul class="tabs tabs-transparent black lighten-2">
    <li class="tab"><a href="#showcases">showcases</a></li>
    <li class="tab"><a href="#buckets">buckets</a></li>
    <li class="tab"><a href="#files">files</a></li>
  </ul>
  
  <div class="card main">
    <div id="showcases" class="col s12">showcases</div>
    <div id="buckets" class="col s12">
      {#if organization}
        <Buckets organization={organization} />
      {/if}
    </div>
    <div id="files" class="col s12">files</div>
  </div>
</div>

<style>
  .main {
    margin-top: 0;
    background: #aaa;
  }
</style>