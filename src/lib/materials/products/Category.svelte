<script lang="ts">
  import { onMount } from 'svelte';

  import Select from 'svelte-select';

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
      const response = await fetch(`https://backend.subvind.com/products/${product.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
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
        alert('The parent product was saved.')
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
    const response = await fetch(`https://backend.subvind.com/categories/orgRelated/${product.organization.id}?limit=100&page=1${search}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.ok) {
      let categories = await response.json();

      console.log('categories', categories)
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
  <br />
  <div>Select a cateogry: {filterText}</div>
  {#if loading === false}
    <Select bind:value {items} bind:filterText on:input={handleInput} on:change={handleChange} />
  {/if}
</div>

<style>
  .detail {
    margin: 0 1em;
    padding-bottom: 1em;
  }
</style>