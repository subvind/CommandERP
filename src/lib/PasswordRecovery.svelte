<script lang="ts">
  import { onMount } from "svelte";

  export let email: any = '';
  let instances: any = undefined;
  let loading: boolean = false;
  let user: any = null;

  onMount(async () => {
    var elems = document.querySelectorAll('.fsergegtrtgvesvfdvzvrese');
    instances = M.Modal.init(elems, {});

    M.updateTextFields();
  })

  let recoverPasswordToken = ''
  let newPassword = ''
  let confirmPassword = ''

	async function submit(event: any) {
    event.preventDefault()

    if (email === '') return alert('Email must be defined.')
    if (recoverPasswordToken === '') return alert('Recover Password Token must be defined.')
    if (newPassword === '') return alert('New Password must be defined.')
    if (confirmPassword === '') return alert('Confirm Password must be defined.')
    
    loading = true

    try {
      const response = await fetch(`https://api.subvind.com/users/resetPassword/${email}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recoverPasswordToken,
          password: newPassword
        }),
      });

      if (response.ok) {
        user = await response.json();

        if (user.authStatus === 'Verified') {
          alert('Success! You may now login with your new password.')
          window.location.href = `/auth/login`
        } else {
          alert('Sorry, we were unable to verify the provided token.')
        }
      } else {
        const errorData = await response.json();
        alert(errorData.error);
      }
    } catch (error) {
      console.error('Error updating user:', error);
      alert('An error occurred during submission.');
    }

    loading = false
  }
</script>

<!-- Modal Trigger -->
<a class="btn yellow lighten-2 black-text" href="#!" on:click={() => { instances[0].open() }}>CONFIRM TOKEN FROM EMAIL</a>

<!-- Modal Structure -->
<form on:submit={(e) => submit(e)}>
  <div class="modal fsergegtrtgvesvfdvzvrese">
    <div class="modal-content">
      <h4>Confirm Token From Email</h4>
      <br />
      <div class="row">
        <div class="input-field col s12">
          <input id="recoverPasswordToken" type="text" class="validate" bind:value={recoverPasswordToken}>
          <label for="recoverPasswordToken">Recover Password Token</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input id="newPassword" type="password" class="validate" bind:value={newPassword}>
          <label for="newPassword">New Password</label>
        </div>
        <div class="input-field col s12">
          <input id="confirmPassword" type="password" class="validate" bind:value={confirmPassword}>
          <label for="confirmPassword">Confirm Password</label>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <a class="waves-effect waves-black btn-flat" href="#!" on:click={() => { instances[0].close() }}>Cancel</a>
      {#if loading}
        <button class="waves-effect btn disabled">Loading</button>
      {:else}
        <button type='submit' class="waves-effect btn yellow black-text lighten-2">Submit</button>
      {/if}
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