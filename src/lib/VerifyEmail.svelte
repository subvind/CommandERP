<script lang="ts">
  import { onMount } from "svelte";

  export let userId: any = null;
  let instances: any = undefined;
  let user: any = undefined;
  let loading: boolean = false;

  onMount(async () => {
    var elems = document.querySelectorAll('.fhtrhtsefafewgergsbxbsdbynrgb');
    instances = M.Modal.init(elems, {});

    const response = await fetch(`https://api.subvind.com/users/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.ok) {
      user = await response.json();

      setTimeout(() => {
        M.updateTextFields();
      }, 0)
    } else {
      const errorData = await response.json();
      alert(errorData.error);
    }
  })

  let emailVerificationToken = ''

	async function submit(event: any) {
    event.preventDefault()

    if (emailVerificationToken === '') return alert('Email Verification Token must be defined.')
    
    loading = true

    try {
      const response = await fetch(`https://api.subvind.com/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${localStorage.getItem("access_token")}`
        },
        body: JSON.stringify({
          emailVerificationToken,
        }),
      });

      if (response.ok) {
        user = await response.json();

        if (user.authStatus === 'Verified') {
          window.location.href = `/${user.username}`
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
<button class="btn yellow lighten-2 black-text" on:click={() => { instances[0].open() }}>CONFIRM TOKEN FROM EMAIL</button>

<!-- Modal Structure -->
<form on:submit={(e) => submit(e)}>
  <div class="modal fhtrhtsefafewgergsbxbsdbynrgb">
    <div class="modal-content">
      <h4>Confirm Token From Email</h4>
      <br />
      <div class="row">
        <div class="input-field col s12">
          <input id="emailVerificationToken" type="text" class="validate" bind:value={emailVerificationToken}>
          <label for="emailVerificationToken">Email Verification Token</label>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="waves-effect waves-black btn-flat" on:click={() => { instances[0].close() }}>Cancel</button>
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