<script lang="ts">
  import { onMount } from 'svelte';

  import Select from 'svelte-select';

  export let value: any;
  
  let items: any = [
    { value: '', label: '' }
  ];
  let filterText: any;
  let loading = true;

  /**
   * update file with latest parent id
   */
  async function handleChange(e: any) {
    console.log(e.detail);
    // e.detail.value
  }

  /**
   * get the latest buckets by search
   */
  async function handleInput () {
    let search = ''
    if (filterText) {
      search = `&search=${filterText}`
    }
    const response = await fetch(`https://api.subvind.com/organizations?limit=100&page=1${search}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.ok) {
      let organizations = await response.json();

      console.log('organizations', organizations)
      items = []; // clear list before repopulating it
      organizations.data.forEach((bucket: any) => {
        items.push({
          value: bucket.id,
          label: bucket.orgname
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

{#if loading === false}
  <div style="color: #9e9e9e; font-size: 0.8rem;">Select an organization: {filterText}</div>
  <Select bind:value {items} bind:filterText on:input={handleInput} on:change={handleChange} />
{:else}
  <div class="progress red lighten-2">
    <div class="indeterminate teal lighten-2"></div>
  </div>
{/if}
