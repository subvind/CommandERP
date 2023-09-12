<script lang="ts">
  import { onMount } from "svelte";
  import jwt_decode from 'jwt-decode';

  let instances: any = undefined;
  let user: any = null;
  let decodedToken: any;
  let loading: boolean = false;

  onMount(async () => {
    let accessToken: any = localStorage.getItem('access_token');

    // Decode the JWT
    decodedToken = jwt_decode(accessToken);

    var elems = document.querySelectorAll('.jnerdfjkbgsdlkjgn');
    instances = M.Modal.init(elems, {});

    console.log('user')
    const response = await fetch(`https://api.subvind.com/users/username/${decodedToken.username}`, {
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

  let building = ''
  let floor = ''
  let room = ''
  let rack = ''
  let rackLevel = ''
  let rackSection = ''
  let container = ''

	async function submit(event: any) {
    event.preventDefault()

    if (building === '') return alert('Building must be defined.')
    if (floor === '') return alert('Floor name must be defined.')
    
    loading = true 

    try {
      const response = await fetch(`https://api.subvind.com/inventory`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          building,
          floor,
          room,
          rack,
          rackLevel,
          rackSection,
          container,
          organization: user.defaultOrganization.id
        }),
      });

      if (response.ok) {
        let inventory = await response.json();
        window.location.href = `/${user.username}/${user.defaultOrganization.orgname}/materials/inventory/${inventory.id}`
      } else {
        const errorData = await response.json();
        alert(errorData.error);
      }
    } catch (error) {
      console.error('Error creating inventory:', error);
      alert('An error occurred during submission.');
    }

    loading = false
  }
</script>

<!-- Modal Trigger -->
<a class="btn red white-text" href="#!" on:click={() => { instances[0].open() }}>CREATE INVENTORY</a>

<!-- Modal Structure -->
<form on:submit={(e) => submit(e)}>
  <div class="modal jnerdfjkbgsdlkjgn">
    <div class="modal-content">
      <h4>Create Inventory</h4>
      <br />
      <div class="row">
        <div class="input-field col s6">
          <input id="building" type="text" class="validate" bind:value={building}>
          <label for="building">Building</label>
        </div>
        <div class="input-field col s6">
          <input id="floor" type="number" class="validate" bind:value={floor}>
          <label for="floor">Floor</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s6">
          <input id="room" type="text" class="validate" bind:value={room}>
          <label for="room">Room</label>
        </div>
        <div class="input-field col s6">
          <input id="rack" type="text" class="validate" bind:value={rack}>
          <label for="rack">Rack</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s6">
          <input id="rackLevel" type="number" class="validate" bind:value={rackLevel}>
          <label for="rackLevel">Rack Level</label>
        </div>
        <div class="input-field col s6">
          <input id="rackSection" type="text" class="validate" bind:value={rackSection}>
          <label for="rackSection">Rack Section</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input id="container" type="text" class="validate" bind:value={container}>
          <label for="container">Container</label>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <a class="waves-effect waves-black btn-flat" href="#!" on:click={() => { instances[0].close() }}>Cancel</a>
      {#if loading}
        <button class="waves-effect btn disabled">Loading</button>
      {:else}
        <button type='submit' class="waves-effect btn red">Submit</button>
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