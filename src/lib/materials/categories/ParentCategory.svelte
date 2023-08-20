<script lang="ts">
  import { onMount } from 'svelte';

  import Select from 'svelte-select';

  export let data: any;
  export let category: any;
  
  let items: any = [];
  let filterText: any;
  let value: any = category.parentCategory.name;
  let loading = true;

  /**
   * update category with latest parent id
   */
  async function handleChange(e: any) {
    console.log(e.detail);

    try {
      const response = await fetch(`https://backend.subvind.com/categories/${category.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          parentCategory: e.detail.value
        }),
      });

      if (response.ok) {
        let merge = {
          ...category,
          ...await response.json(),
        }
        category = merge
        alert('The parent category was saved.')
      } else {
        const errorData = await response.json();
        alert(errorData.error);
      }
    } catch (error) {
      console.error('Error updating category:', error);
      alert('An error occurred during submission.');
    }
  }

  /**
   * get the latest categories by search
   */
  async function handleInput () {
    let search = ''
    if (filterText) {
      search = `&search=${filterText}`
    }
    const response = await fetch(`https://backend.subvind.com/categories/orgRelated/${category.organization.id}?limit=100&page=1${search}`, {
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