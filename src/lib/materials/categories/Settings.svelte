<script lang="ts">
  import { onMount } from "svelte";

  export let categoryId: any = null;
  let instances: any = undefined;
  let category: any = undefined;

  onMount(async () => {
    var elems = document.querySelectorAll('.sdffdddfsftgrtgsfd');
    instances = M.Modal.init(elems, {});

    const response = await fetch(`https://backend.subvind.com/categories/${categoryId}`, {
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
    
    try {
      const response = await fetch(`https://backend.subvind.com/users/${categoryId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
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
      console.error('Error registering user:', error);
      alert('An error occurred during submission.');
    }
  }
</script>

<!-- Modal Trigger -->
<a class="btn white black-text" href="#!" on:click={() => { instances[0].open() }}>SETTINGS</a>

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
        </div>
        <div class="input-field col s6">
          <input id="slug" type="text" class="validate" bind:value={slug}>
          <label for="slug">Slug</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input id="description" type="text" class="validate" bind:value={description}>
          <label for="description">Description</label>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <a class="waves-effect waves-black btn-flat" href="#!" on:click={() => { instances[0].close() }}>Cancel</a>
      <button type='submit' class="waves-effect btn red black-text darken-2">Submit</button>
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