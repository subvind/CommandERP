<script lang="ts">
  import { onMount } from 'svelte';

  import Select from 'svelte-select';

  export let data: any;
  export let product: any;
  
  let items: any = [
    { value: '', label: '' }
  ];
  let filterText: any;
  let value: any = product.bucket?.name || '';
  let loading = true;

  /**
   * update product with latest parent id
   */
  async function handleChange(e: any) {
    console.log(e.detail);

    let bucket
    if (e.detail.value === '') {
      bucket = null
    } else {
      bucket = e.detail.value
    }

    try {
      const response = await fetch(`https://api.subvind.com/products/${product.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${localStorage.getItem("access_token")}`
        },
        body: JSON.stringify({
          bucket: bucket
        }),
      });

      if (response.ok) {
        let merge = {
          ...product,
          ...await response.json(),
        }
        product = merge
        alert('The bucket for this product was saved.')
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
    const response = await fetch(`https://api.subvind.com/buckets/orgRelated/${product.organization.id}?limit=100&page=1${search}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.ok) {
      let buckets = await response.json();

      console.log('buckets', buckets)
      items = []; // clear list before repopulating it
      buckets.data.forEach((bucket: any) => {
        items.push({
          value: bucket.id,
          label: bucket.name
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
    <div>Select a bucket: {filterText}</div>
    <Select bind:value {items} bind:filterText on:input={handleInput} on:change={handleChange} />
  {:else}
    <div class="progress red lighten-2">
      <div class="indeterminate teal lighten-2"></div>
    </div>
  {/if}
</div>

<style>
  .detail {
    margin: 0 1em;
    padding-bottom: 1em;
  }
</style>