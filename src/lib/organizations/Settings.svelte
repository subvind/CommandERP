<script lang="ts">
  import { onMount } from "svelte";

  export let user: any;
  export let organizationId: any = null;
  let instances: any = undefined;
  let organization: any = undefined;

  onMount(async () => {
    var elems = document.querySelectorAll('.sdcebryytpozdscqwm');
    instances = M.Modal.init(elems, {});

    const response = await fetch(`https://backend.subvind.com/organizations/${organizationId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.ok) {
      organization = await response.json();
      orgname = organization.orgname
      displayName = organization.displayName
      hostname = organization.hostname

      setTimeout(() => {
        M.updateTextFields();
      }, 0)
    } else {
      const errorData = await response.json();
      alert(errorData.error);
    }

  })

  let orgname = ''
  let displayName = ''
	let hostname = ''

	async function submit(event: any) {
    event.preventDefault()

    if (orgname === '') return alert('Username must be defined.')
    if (displayName === '') return alert('First name must be defined.')
    if (hostname === '') return alert('Email must be defined.')
    
    try {
      const response = await fetch(`https://backend.subvind.com/organizations/${organizationId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orgname,
          displayName,
          hostname,
        }),
      });

      if (response.ok) {
        organization = await response.json();
        window.location.href = `/${user.username}/${organization.orgname}`
      } else {
        const errorData = await response.json();
        alert(errorData.error);
      }
    } catch (error) {
      console.error('Error registering organization:', error);
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
        <div class="input-field col s6">
          <input id="orgname" type="text" class="validate" bind:value={orgname}>
          <label for="orgname">Orgname</label>
        </div>
        <div class="input-field col s6">
          <input id="displayName" type="text" class="validate" bind:value={displayName}>
          <label for="displayName">Display Name</label>
        </div>
        <div class="input-field col s12">
          <input id="hostname" type="text" class="validate" bind:value={hostname}>
          <label for="hostname">Hostname</label>
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