<script lang="ts">
  import { onMount } from 'svelte';

  import Select from 'svelte-select';

  export let data: any;
  export let product: any;
  
  let items: any = [
    { value: '', label: '' }
  ];
  let filterText: any;
  let value: any = product.coverPhoto?.id || '';
  let loading = true;

  /**
   * update product with latest parent id
   */
  async function handleChange(e: any) {
    console.log(e.detail);

    let file
    if (e.detail.value === '') {
      file = null
    } else {
      file = e.detail.value
    }

    try {
      const response = await fetch(`https://api.subvind.com/products/${product.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${localStorage.getItem("access_token")}`
        },
        body: JSON.stringify({
          coverPhoto: file
        }),
      });

      if (response.ok) {
        let merge = {
          ...product,
          ...await response.json(),
        }
        product = merge
        alert('The cover photo for this product was saved.')
      } else {
        const errorData = await response.json();
        alert(errorData.error);
      }
    } catch (error) {
      console.error('Error updating product:', error);
      alert('An error occurred during submission.');
    }
  }

  /**
   * get the latest products by search
   */
  async function handleInput () {
    let search = ''
    if (filterText) {
      search = `&search=${filterText}`
    }
    const response = await fetch(`https://api.subvind.com/files/bucketRelated/${product.bucket.id}?limit=100&page=1${search}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.ok) {
      let files = await response.json();

      console.log('files', files)
      items = []; // clear list before repopulating it
      files.data.forEach((file: any) => {
        items.push({
          value: file.id,
          label: file.filename
        })
      })
      console.log('items', items)
      loading = false
    } else {
      const errorData = await response.json();
      alert(errorData.error);
    }
  }

  onMount(() => {
    handleInput()
  })
</script>


<div class="detail">
  <br />
  {#if loading === false}
    <div>Select a cover photo: {filterText}</div>
    <Select bind:value {items} bind:filterText on:input={handleInput} on:change={handleChange} />
  {:else}
    <div class="progress red lighten-2">
      <div class="indeterminate teal lighten-2"></div>
    </div>
  {/if}
  {#if product.coverPhoto}
    <br />
    <img src={`https://s3.us-east-2.amazonaws.com/${data.orgname}.${product.coverPhoto.bucket.name}/${product.coverPhoto.filename}`} alt="">
  {/if}
</div>

<style>
  .detail {
    margin: 0 1em;
    padding-bottom: 1em;
  }

  img {
    max-width: 100%;
  }
</style>