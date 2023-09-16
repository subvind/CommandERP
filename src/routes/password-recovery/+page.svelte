<script lang="ts">
	import { onMount } from "svelte";
  import jwt_decode from 'jwt-decode';

  import PasswordRecovery from "$lib/PasswordRecovery.svelte";

  let email: string = '';
	let loading: boolean = false;
	
	async function passwordRecovery(event: any) {
    event.preventDefault()
    
    if (email === '') return alert('Email must be defined.')

    loading = true

    try {
      const response = await fetch(`https://api.subvind.com/users/recoverPassword/${email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
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

	onMount(async () => {
	})
</script>

<svelte:head>
  <title>Password Recovery - nomy.ERP</title>
	<meta name="description" content="About this app" />
</svelte:head>

<br />
<br />
<div class="container">
  <div class="card">
    <div class="card-content">
      <h4>Password Recovery</h4>
    
      <p>Use the following form to reset your password.</p>
      
      <br />
      <div class="row">
        <div class="input-field col s12">
          <input id="email" type="email" placeholder="test@test.com" class="validate" bind:value={email}>
          <label for="email">Email</label>
        </div>
      </div>
      {#if loading}
        <button style="" class="waves-effect btn disabled">Loading</button>
      {:else}
        <button style="" class="waves-effect yellow black-text lighten-2 btn" on:click={passwordRecovery}>send password recovery token</button>
      {/if}
      <br />
      <br />
      <PasswordRecovery email={email} />
    </div>
  </div>
</div>

<style>
  h4 {
    margin: 0;
  }
</style>