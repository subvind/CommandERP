<script lang="ts">
	import { onMount } from "svelte";
  import jwt_decode from 'jwt-decode';

  import VerifyEmail from "$lib/VerifyEmail.svelte";

  let decodedToken: any = null;
  let user: any;
	let loading: boolean = false;
	
	async function verifyEmail(event: any) {
    event.preventDefault()
    
    loading = true

    try {
      const response = await fetch(`https://api.subvind.com/users/verifyEmail/${user.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${localStorage.getItem("access_token")}`
        },
        body: JSON.stringify({}),
      });

      if (response.ok) {
				let res = await response.json();

				alert('Verify email code sent successfully.')
      } else {
        const errorData = await response.json();
        alert(errorData.error);
      }
    } catch (error) {
      console.error('Error registering user:', error);
      alert('An error occurred during submission.');
    }

    loading = false
  }

  async function load() {
    const response = await fetch(`https://api.subvind.com/users/username/${decodedToken.username}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
				'authorization': `Bearer ${localStorage.getItem("access_token")}`
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
	})
</script>

<svelte:head>
  <title>Email Verification - nomy.ERP</title>
	<meta name="description" content="About this app" />
</svelte:head>

<br />
<br />
<div class="container">
  <div class="card">
    <div class="card-content">
      <h4>Email Verification</h4>
    
      <p>All users must be verified before continuing.</p>

      {#if user}
        <br />
        {#if loading}
          <button style="" class="waves-effect btn disabled">Loading</button>
        {:else}
          <button style="" class="waves-effect yellow black-text lighten-2 btn" on:click={verifyEmail}>send email verification token</button>
        {/if}
        <br />
        <br />
        <VerifyEmail userId={user.id} />
      {/if}
    </div>
  </div>
</div>

<style>
  h4 {
    margin: 0;
  }
</style>