<script lang="ts">
  import { onMount } from "svelte";

  export let userId: any = null;
  let instances: any = undefined;
  let user: any = undefined;

  onMount(async () => {
    var elems = document.querySelectorAll('.sdcebryytpozdscqwm');
    instances = M.Modal.init(elems, {});

    const response = await fetch(`https://backend.subvind.com/users/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.ok) {
      user = await response.json();
      username = user.username
      firstName = user.firstName
      lastName = user.lastName
      email = user.email

      setTimeout(() => {
        M.updateTextFields();
      }, 0)
    } else {
      const errorData = await response.json();
      alert(errorData.error);
    }

  })

  let username = ''
  let firstName = ''
  let lastName = ''
	let email = ''

	async function submit(event: any) {
    event.preventDefault()

    if (username === '') return alert('Username must be defined.')
    if (firstName === '') return alert('First name must be defined.')
    if (lastName === '') return alert('Last name must be defined.')
    if (email === '') return alert('Email must be defined.')
    
    try {
      const response = await fetch(`https://backend.subvind.com/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          firstName,
          lastName,
          email,
        }),
      });

      if (response.ok) {
        user = await response.json();
        window.location.href = `/${user.username}`
      } else {
        const errorData = await response.json();
        alert(errorData.error);
      }
    } catch (error) {
      console.error('Error updating user:', error);
      alert('An error occurred during submission.');
    }
  }
</script>

<!-- Modal Trigger -->
<a class="btn white black-text" href="#!" on:click={() => { instances[0].open() }}>SETTINGS</a>

<!-- Modal Structure -->
<form on:submit={(e) => submit(e)}>
  <div class="modal sdcebryytpozdscqwm">
    <div class="modal-content">
      <h4>Settings</h4>
      <br />
      <div class="row">
        <div class="input-field col s12">
          <input id="username" type="text" class="validate" bind:value={username}>
          <label for="username">Username</label>
        </div>
        <div class="input-field col s6">
          <input id="firstName" type="text" class="validate" bind:value={firstName}>
          <label for="firstName">First Name</label>
        </div>
        <div class="input-field col s6">
          <input id="lastName" type="text" class="validate" bind:value={lastName}>
          <label for="lastName">Last Name</label>
        </div>
        <div class="input-field col s12">
          <input id="email" type="email" class="validate" bind:value={email}>
          <label for="email">Email</label>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <a class="waves-effect waves-black btn-flat" href="#!" on:click={() => { instances[0].close() }}>Cancel</a>
      <button type='submit' class="waves-effect btn yellow black-text lighten-2">Submit</button>
    </div>
  </div>
</form>

<style>
  .modal {
    color: #333;
    width: 500px;
  }

  .row {
    margin-bottom: 0;
  }

  :global(nav) .modal .input-field {
    margin: 1em 0;
    height: 100%;
  }

  :global(nav) .modal .input-field input {
    border-bottom: 1px solid;
  }
</style>