<script lang="ts">
	import { onMount } from "svelte";

  import jwt_decode from 'jwt-decode';

  let decodedToken: any = null;
  let user: any;
	let loading: boolean = false;
  let code: any = '';
  let organization: any = {};
  let ebayAccessToken: any = '';
  let organizationId: string = '';

  async function load() {
    if (decodedToken.type === 'user') {
      const response = await fetch(`https://api.subvind.com/users/username/${decodedToken.username}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      if (response.ok) {
        user = await response.json();
        organizationId = user.defaultOrganization.id;
      } else {
        const errorData = await response.json();
        alert(errorData.error);
      }
    }

    if (decodedToken.type === 'account') {
      /**
       * type === 'account'
       **/ 
      const response2 = await fetch(`https://api.subvind.com/organizations/orgname/${decodedToken.orgname}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      if (response2.ok) {
        organization = await response2.json();
        organizationId = organization.id
      } else {
        const errorData = await response2.json();
        alert(errorData.error);
      }
    }

    return organizationId;
  }

	onMount(async () => {
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);

    // Get individual query parameters
    code = searchParams.get('code'); // "kefjnlwfafjfajk"
    // code = searchParams.get('param1'); // "value1"

    let accessToken: any = localStorage.getItem('access_token');

    // Decode the JWT
    decodedToken = jwt_decode(accessToken);

    let orgId = await load()
    
    /**
     * updateEbayAccessToken
     **/ 
      const response2 = await fetch(`https://api.subvind.com/organizations/ebayAccessToken/${organizationId}?code=${encodeURIComponent(code)}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${localStorage.getItem("access_token")}`
      }
    });

    if (response2.ok) {
      organization = await response2.json();
      ebayAccessToken = organization.ebayAccessToken
    } else {
      const errorData = await response2.json();
      alert(errorData.error);
    }

	})
</script>

<svelte:head>
  <title>Allow subvind to access ebay - Accepted - nomy.ERP</title>
	<meta name="description" content="About this app" />
</svelte:head>

<br />
<br />
<div class="container">
  <div class="card">
    <div class="card-content">
      <h4>Accepted!</h4>
    
      <p>Allow subvind to access ebay.</p>
      <code>{code}</code>
      <code>{ebayAccessToken}</code>
    </div>
  </div>
</div>

<style>
  h4 {
    margin: 0;
  }
</style>