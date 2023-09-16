<script lang="ts">
  import { onMount } from "svelte";

  export let categoryId: any = null;
  let instances: any = undefined;
  let category: any = undefined;
  let loading: boolean = false;

  onMount(async () => {
    var elems = document.querySelectorAll('.sdffdddfsftgrtgsfd');
    instances = M.Modal.init(elems, {});

    const response = await fetch(`https://api.subvind.com/categories/${categoryId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.ok) {
      category = await response.json();
      name = category.name
      slug = category.slug
      description = category.description

      setTimeout(() => {
        M.updateTextFields();
      }, 0)
    } else {
      const errorData = await response.json();
      alert(errorData.error);
    }

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
      const response = await fetch(`https://api.subvind.com/categories/${categoryId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${localStorage.getItem("access_token")}`
        },
        body: JSON.stringify({
          name,
          slug,
          description,
        }),
      });

      if (response.ok) {
        category = await response.json();
        window.location.reload();
      } else {
        const errorData = await response.json();
        alert(errorData.error);
      }
    } catch (error) {
      console.error('Error updating category:', error);
      alert('An error occurred during submission.');
    }

    loading = false
  }
</script>

<!-- Modal Trigger -->
<a class="btn white red darken-2" href="#!" on:click={() => { instances[0].open() }}>EDIT CATEGORY</a>

<!-- Modal Structure -->
<form on:submit={(e) => submit(e)}>
  <div class="modal sdffdddfsftgrtgsfd">
    <div class="modal-content">
      <h4>Settings</h4>
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
            <a href={`https://${category.organization.orgname}.erpnomy.com/categories/${slug}`} target="_blank">https://{category.organization.orgname}.erpnomy.com/categories/{slug}</a>
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
      <a class="waves-effect waves-black btn-flat" href="#!" on:click={() => { instances[0].close() }}>Cancel</a>
      {#if loading}
        <button class="waves-effect btn disabled">Loading</button>
      {:else}
        <button type='submit' class="waves-effect btn red darken-2">Submit</button>
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