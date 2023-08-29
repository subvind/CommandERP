<script lang="ts">
  import { onMount } from "svelte";
  import jwt_decode from 'jwt-decode';

  let instances: any = undefined;
  let user: any = null;
  let decodedToken: any;

  onMount(async () => {
    let accessToken: any = localStorage.getItem('access_token');

    // Decode the JWT
    decodedToken = jwt_decode(accessToken);

    var elems = document.querySelectorAll('.jnerdfjkbgsdlkjgn');
    instances = M.Modal.init(elems, {});

    console.log('user')
    const response = await fetch(`https://backend.subvind.com/users/username/${decodedToken.username}`, {
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

  let stockKeepingUnit = ''
  let name = ''
  let photoUrl = ''
  let bucket = ''
  let ebayListing = ''

	async function submit(event: any) {
    event.preventDefault()

    if (stockKeepingUnit === '') return alert('Stock Keeping Unit (SKU) must be defined.')
    
    try {
      const response = await fetch(`https://backend.subvind.com/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          stockKeepingUnit,
          name,
          photoUrl,
          bucket,
          ebayListing,
          organization: user.defaultOrganization.id
        }),
      });

      if (response.ok) {
        let product = await response.json();
        window.location.href = `/${user.username}/${user.defaultOrganization.orgname}/materials/products/${product.stockKeepingUnit}`
      } else {
        const errorData = await response.json();
        alert(errorData.error);
      }
    } catch (error) {
      console.error('Error creating product:', error);
      alert('An error occurred during submission.');
    }
  }
</script>

<!-- Modal Trigger -->
<a class="btn red white-text" href="#!" on:click={() => { instances[0].open() }}>CREATE PRODUCT</a>

<!-- Modal Structure -->
<form on:submit={(e) => submit(e)}>
  <div class="modal jnerdfjkbgsdlkjgn">
    <div class="modal-content">
      <h4>Create Product</h4>
      <br />
      <div class="row">
        <div class="input-field col s12">
          <input id="stockKeepingUnit" type="text" class="validate" bind:value={stockKeepingUnit}>
          <label for="stockKeepingUnit">SKU</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input id="name" type="text" class="validate" bind:value={name}>
          <label for="name">Name</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input id="photoUrl" type="text" class="validate" bind:value={photoUrl}>
          <label for="photoUrl">Cover Photo</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s6">
          <input id="bucket" type="text" class="validate" bind:value={bucket}>
          <label for="bucket">Bucket</label>
        </div>
        <div class="input-field col s6">
          <input id="ebayListing" type="text" class="validate" bind:value={ebayListing}>
          <label for="ebayListing">Ebay Listing</label>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <a class="waves-effect waves-black btn-flat" href="#!" on:click={() => { instances[0].close() }}>Cancel</a>
      <button type='submit' class="waves-effect btn red">Submit</button>
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