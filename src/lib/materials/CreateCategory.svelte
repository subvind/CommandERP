<script lang="ts">
  import { onMount } from "svelte";
  import jwt_decode from 'jwt-decode';

  export let organization: any;
  let instances: any = undefined;
  let decodedToken: any;
  let loading: boolean = false;

  onMount(async () => {
    let accessToken: any = localStorage.getItem('access_token');

    // Decode the JWT
    decodedToken = jwt_decode(accessToken);

    var elems = document.querySelectorAll('.sdjhkfbsdhjfbsdfd');
    instances = M.Modal.init(elems, {});

    setTimeout(() => {
      M.updateTextFields();
    }, 0)
  })

  let name = ''
  let slug = ''
  let description = ''

	async function submit(event: any) {
    event.preventDefault()

    if (name === '') return alert('Name must be defined.')
    if (slug === '') return alert('Slug must be defined.')
    if (description === '') return alert('Description must be defined.')
    
    loading = true 

    try {
      const response = await fetch(`https://api.subvind.com/categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${localStorage.getItem("access_token")}`
        },
        body: JSON.stringify({
          name,
          slug,
          description,
          organization: {
            id: organization.id
          }
        }),
      });

      if (response.ok) {
        let category = await response.json();
        window.location.href = `/${organization.owner.username}/${organization.orgname}/materials/categories/${category.slug}`
      } else {
        const errorData = await response.json();
        alert(errorData.error);
      }
    } catch (error) {
      console.error('Error creating category:', error);
      alert('An error occurred during submission.');
    }

    loading = false 

  }
</script>

<!-- Modal Trigger -->
<button class="btn red white-text" on:click={() => { instances[0].open() }}>CREATE CATEGORY</button>

<!-- Modal Structure -->
<form on:submit={(e) => submit(e)}>
  <div class="modal sdjhkfbsdhjfbsdfd">
    <div class="modal-content">
      <h4>Create Category</h4>
      <br />
      <div class="row">
        <div class="input-field col s6">
          <input id="name" type="text" class="validate" bind:value={name}>
          <label for="name">Name</label>
          <span class="helper-text">Use all lowercase here. Shown in Catalog as all uppercase.</span>
        </div>
        <div class="input-field col s6">
          <input id="slug" type="text" class="validate" bind:value={slug}>
          <label for="slug">Slug</label>
          <span class="helper-text">Same as name except: No spaces. No special characters. May contain dashes and periods.</span>
        </div>
      </div>
      {#if slug}
        <div class="row">
          <div class="col s12">
            <span>Catalog:</span><br />
            <a href={`https://${organization.orgname}.erpnomy.com/categories/${slug}`} target="_blank">https://{organization.orgname}.erpnomy.com/categories/{slug}</a>
            <br />
            <br />
          </div>
        </div>
      {/if}
      <div class="row">
        <div class="input-field col s12">
          <input id="description" type="text" class="validate" bind:value={description}>
          <label for="description">Description</label>
          <span class="helper-text">Make it at least one sentence.</span>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="waves-effect waves-black btn-flat" on:click={(e) => { e.preventDefault(); instances[0].close(); }}>Cancel</button>
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