
<script lang="ts">
  import { onMount } from 'svelte';
  import jwt_decode from 'jwt-decode';
    import SelectOrganization from './SelectOrganization.svelte';

  let loading: boolean = false;
	let email = ''
  let password = ''
  let type = ''
  let organizationId = ''

  async function login(event: any) {
    event.preventDefault()

    if (type === '') return alert('Account type must be defined.')
    if (organizationId === '') return alert('Organization must be defined.')
    if (email === '') return alert('Email must be defined.')
    if (password === '') return alert('Password must be defined.')

    loading = true 

    try {
      if (type === 'root-user') {
        const response = await fetch('https://api.subvind.com/auth/userLogin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password
          }),
        });
  
        if (response.ok) {
          let res = await response.json();
  
          console.log('access_token', res.access_token)
  
          // Save the access token to localStorage
          localStorage.setItem('access_token', res.access_token);
  
          // Decode the JWT
          let decodedToken: any = jwt_decode(res.access_token);
  
          console.log('decoded_token', decodedToken)
  
          // You can redirect the user to a new page or handle the success scenario in your app
          window.location.href = `/${decodedToken.username}`
        } else {
          const errorData = await response.json();
          alert(errorData.error);
        }
      } else {
        const response = await fetch('https://api.subvind.com/auth/accountLogin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: `${organizationId}:${email}`,
            password
          }),
        });
  
        if (response.ok) {
          let res = await response.json();
          console.log('access_token', res.access_token)
          localStorage.setItem('access_token', res.access_token);
          let decodedToken: any = jwt_decode(res.access_token);
          window.location.href = `${decodedToken.ownername}/${decodedToken.orgname}/accounts/${decodedToken.accountname}`
        } else {
          const errorData = await response.json();
          alert(errorData.error);
        }
      }
    } catch (error) {
      console.error('Error logging in user:', error);
      alert('An error occurred during login.');
    }

    loading = false
  }

  onMount(() => {
    M.updateTextFields();

    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, {});
  })
</script>

<div class="contain">
  <div class="header">
    <a href="/about">
      <img src="/anchor.png" alt="" class="anchor">
    </a>
    <h1 class="title">
      Login
    </h1>
  </div>
  <form class="card" on:submit={(e) => login(e)}>
    <div class="card-content">
      <div class="row">
        <div class="input-field col s12">
          <select bind:value={type}>
            <option value="" disabled selected>Choose your membership</option>
            <option value="root-user">root user</option>
            <option value="organization-employee">organization employee</option>
            <option value="organization-supplier">organization supplier</option>
            <option value="organization-customer">organization customer</option>
          </select>
          <label>Account Type</label>
        </div>
        {#if type && type !== 'root-user'}
          <div class="input-field col s12" style="margin-top: 0;">
            <SelectOrganization bind:value={organizationId} />
          </div>
        {/if}
        <div class="input-field col s12">
          <input id="email" type="email" placeholder="test@test.com" class="validate" bind:value={email}>
          <label for="email">Email</label>
        </div>
        <div class="input-field col s12">
          <input id="password" type="password" placeholder="test123" class="validate" bind:value={password}>
          <label for="password">Password</label>
        </div>
        <br />
        {#if loading}
          <button style="margin-left: 1em;" class="waves-effect btn disabled">Loading</button>
        {:else}
          <button style="margin-left: 1em;" type='submit' class="waves-effect yellow black-text lighten-2 btn">Submit</button>
        {/if}
      </div>
    </div>
  </form>
  <div>
    <a href="/auth/register" class="waves-effect black white-text btn" style="float: right;">Register</a>
    <br />
    <br />
    <a href="/password-recovery" class="waves-effect white black-text btn" style="float: right;">Password Recovery</a>
    <br />
    <br />
    <br />
    <br />
  </div>
</div>

<style>
  .contain {
    max-width: 400px;
    margin: 0 auto;
  }

  .header {
    text-align: center;
  }

	.title {
		font-weight: 900;
		font-size: 2em;
		margin: 0;
	}

  .anchor {
    height: 150px;
   -webkit-filter: invert(1);
   filter: invert(1);
   text-align: center;
  }
</style>