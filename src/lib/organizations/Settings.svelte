<script lang="ts">
  import { onMount } from "svelte";

  export let user: any;
  export let organizationId: any = null;
  let instances: any = undefined;
  let organization: any = undefined;
  let loading: boolean = false;

  onMount(async () => {
    var elems = document.querySelectorAll('.sdcebryytpozdscqwm');
    instances = M.Modal.init(elems, {});

    const response = await fetch(`https://api.subvind.com/organizations/${organizationId}`, {
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
    
    loading = true 

    try {
      const response = await fetch(`https://api.subvind.com/organizations/${organizationId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${localStorage.getItem("access_token")}`
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

    loading = false
  }
</script>

<!-- Modal Trigger -->
<a class="btn yellow lighten-2 black-text" href="#!" on:click={() => { instances[0].open() }}>EDIT ORGANIZATION</a>

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
          <span class="helper-text">Use all lowercase here. No spaces. Keep it less than 30 letters. Must start and end with a lowercase letter or number.</span>
        </div>
        <div class="input-field col s6">
          <input id="displayName" type="text" class="validate" bind:value={displayName}>
          <label for="displayName">Display Name</label>
          <span class="helper-text">Anything is allowed here.</span>
        </div>
        {#if orgname}
          <div class="col s12">
            <span>Catalog:</span><br />
            <a href={`https://${orgname}.erpnomy.com`} target="_blank">https://{orgname}.erpnomy.com</a>
            <br />
            <br />
          </div>
        {/if}
        <div class="input-field col s12">
          <input id="hostname" type="text" class="validate" bind:value={hostname}>
          <label for="hostname">Hostname</label>
          <span class="helper-text">Should be a valid browser domain name. May include sub domain.</span>
        </div>
        {#if hostname}
          <div class="col s12">
            <span>Point to Catalog:</span><br />
            <a href={`https://${hostname}`} target="_blank">https://{hostname}</a>
            <br />
            <br />
          </div>
        {/if}
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