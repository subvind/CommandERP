<script lang="ts">
  import { onMount } from 'svelte';

  import Select from 'svelte-select';
  import CreateCategory from '../CreateCategory.svelte';

  export let data: any;
  export let category: any;
  
  let items: any = [
    { value: '', label: '' }
  ];
  let filterText: any;
  let value: any = category.parentCategory?.name || '';
  let loading = true;

  /**
   * update category with latest parent id
   */
  async function handleChange(e: any) {
    console.log(e.detail);

    let parentCategory
    if (e.detail.value === '') {
      parentCategory = null
    } else {
      parentCategory = e.detail.value
    }

    try {
      const response = await fetch(`https://api.subvind.com/categories/${category.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${localStorage.getItem("access_token")}`
        },
        body: JSON.stringify({
          parentCategory: parentCategory
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
    const response = await fetch(`https://api.subvind.com/categories/orgRelated/${category.organization.id}?limit=100&page=1${search}`, {
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
      <p>Use a parent category that will best suite this category. On the frontend users will be able to find a sub category by selecting a root category.</p>
      <CreateCategory organization={category.organization} />
    </div>
  </div>
</div>

<style>
  .detail {
    margin: 0 1em;
    padding-bottom: 1em;
  }
</style>