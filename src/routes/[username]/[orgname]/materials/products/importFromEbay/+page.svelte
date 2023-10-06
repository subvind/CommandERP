<script lang="ts">
  import { onMount } from 'svelte';
  
  import Products from '$lib/materials/Products.svelte';

  export let data
  let organization: any;

  onMount(async () => {

    var elems = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(elems, {
      alignment: 'right'
    });
    
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

<nav class="nav-extended grey darken-4">
  <div class="container">
    <div class="nav-wrapper">
      <a href="../products" class="brand-logo white-text">Products: Import From Ebay</a>
      <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
    </div>
  </div>
</nav>

<div class="container">
  {#if organization}
    <!-- <Products organization={organization} /> -->
    <br />
    <a href="https://auth.ebay.com/oauth2/authorize?client_id=TravisBu-subvind-PRD-efcb77900-ac00e58c&response_type=code&redirect_uri=Travis_Burandt-TravisBu-subvin-ufmnppv&scope=https://api.ebay.com/oauth/api_scope https://api.ebay.com/oauth/api_scope/sell.marketing.readonly https://api.ebay.com/oauth/api_scope/sell.marketing https://api.ebay.com/oauth/api_scope/sell.inventory.readonly https://api.ebay.com/oauth/api_scope/sell.inventory https://api.ebay.com/oauth/api_scope/sell.account.readonly https://api.ebay.com/oauth/api_scope/sell.account https://api.ebay.com/oauth/api_scope/sell.fulfillment.readonly https://api.ebay.com/oauth/api_scope/sell.fulfillment https://api.ebay.com/oauth/api_scope/sell.analytics.readonly https://api.ebay.com/oauth/api_scope/sell.finances https://api.ebay.com/oauth/api_scope/sell.payment.dispute https://api.ebay.com/oauth/api_scope/commerce.identity.readonly https://api.ebay.com/oauth/api_scope/commerce.notification.subscription https://api.ebay.com/oauth/api_scope/commerce.notification.subscription.readonly" class="btn red darken-2" target="_blank">allow ebay access</a>
  {/if}
</div>

<style>
  nav {
    -webkit-box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 3px 5px 0 rgba(0,0,0,0.2);
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 3px 5px 0 rgba(0,0,0,0.2);
  }

  .dropdown-content {
    width: 200px !important;
  }
</style>