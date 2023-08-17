<script lang="ts">
  import { onMount } from "svelte";

  import Settings from '$lib/organizations/Settings.svelte'
  import Organizations from '$lib/users/Organizations.svelte'

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
  })
</script>

<nav class="nav-extended yellow lighten-2">
  <div class="container">
    <div class="nav-wrapper">
      {#if organization}
        <a href="#" class="brand-logo black-text">{organization.displayName}</a>
      {/if}
      <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
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

<ul id="navigation" class="sidenav">
  <li><a href="sass.html">Sass</a></li>
  <li><a href="badges.html">Components</a></li>
  <li><a href="collapsible.html">JavaScript</a></li>
</ul>

{#if organization}
  <div class="container">
    <div class="card main">
      <div id="profile" class="col s12">
        {JSON.stringify(organization, null, 2)}
      </div>
      <div id="suppliers" class="col s12">
        {#if user}
          <Organizations user={user} />
        {/if}
      </div>
      <div id="employees" class="col s12">employees</div>
      <div id="customers" class="col s12">customers</div>
      
    </div>
  </div>
{/if}

<style>
  .main {
    margin-top: 0;
    background: #aaa;
  }
</style>