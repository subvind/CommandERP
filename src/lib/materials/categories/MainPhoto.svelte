<script lang="ts">
  import { onMount } from 'svelte';

  import Select from 'svelte-select';

  export let data: any;
  export let category: any;
  
  let items: any = [
    { value: '', label: '' }
  ];
  let filterText: any;
  let value: any = category.mainPhoto?.filename || '';
  let loading = true;

  /**
   * update category with latest parent id
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
      const response = await fetch(`https://api.subvind.com/categories/${category.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${localStorage.getItem("access_token")}`
        },
        body: JSON.stringify({
          mainPhoto: file
        }),
      });

      if (response.ok) {
        let merge = {
          ...category,
          ...await response.json(),
        }
        category = merge
        alert('The main photo for this category was saved.')
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
    const response = await fetch(`https://api.subvind.com/files/orgRelated/${category.organization.id}?limit=100&page=1${search}`, {
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
    <div>Select a main photo: {filterText}</div>
    <Select bind:value {items} bind:filterText on:input={handleInput} on:change={handleChange} />
  {:else}
    <div class="progress red lighten-2">
      <div class="indeterminate teal lighten-2"></div>
    </div>
  {/if}
  {#if category.mainPhoto}
    <br />
    <img src={`https://s3.us-east-2.amazonaws.com/${data.orgname}.${category.mainPhoto.bucket.name}/${category.mainPhoto.filename}`} alt="">
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