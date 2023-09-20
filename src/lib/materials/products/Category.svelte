<script lang="ts">
  import { onMount } from 'svelte';

  import Select from 'svelte-select';
  import CreateCategory from '../CreateCategory.svelte';

  export let data: any;
  export let product: any;
  
  let items: any = [
    { value: '', label: '' }
  ];
  let filterText: any;
  let value: any = product.category?.name || '';
  let loading = true;

  /**
   * update product with latest parent id
   */
  async function handleChange(e: any) {
    console.log(e.detail);

    let category
    if (e.detail.value === '') {
      category = null
    } else {
      category = e.detail.value
    }

    try {
      const response = await fetch(`https://api.subvind.com/products/${product.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${localStorage.getItem("access_token")}`
        },
        body: JSON.stringify({
          category: category
        }),
      });

      if (response.ok) {
        let merge = {
          ...product,
          ...await response.json(),
        }
        product = merge
        alert('The category for this product was saved.')
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
    const response = await fetch(`https://api.subvind.com/categories/orgRelated/${product.organization.id}?limit=100&page=1${search}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.ok) {
      let categories = await response.json();

      console.log('categories', categories)
      items = []; // clear list before repopulating it
      categories.data.forEach((category: any) => {
        items.push({
          value: category.id,
          label: category.name
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
  <div class="row">
    <div class="col s12 m6">
      <br />
      {#if loading === false}
        <div>Select a category: {filterText}</div>
        <Select bind:value {items} bind:filterText on:input={handleInput} on:change={handleChange} />
      {:else}
        <div class="progress red lighten-2">
          <div class="indeterminate teal lighten-2"></div>
        </div>
      {/if}
    </div>
    <div class="col s12 m6">
      <p>Use a category that will best suite this product. On the frontend users will be able to find this product by selecting a category.</p>
      <CreateCategory organization={product.organization} />
    </div>
  </div>
</div>

<style>
  .detail {
    margin: 0 1em;
    padding-bottom: 1em;
  }
</style>