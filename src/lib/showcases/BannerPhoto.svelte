<script lang="ts">
  import { onMount } from 'svelte';
  
  import Select from 'svelte-select';
  import UploadFile from '$lib/organizations/UploadFile.svelte';

  export let data: any;
  export let showcase: any;
  export let organization: any;
  
  let items: any = [
    { value: '', label: '' }
  ];
  let filterText: any;
  let value: any = showcase.bannerPhoto?.filename || '';
  let loading = true;

  /**
   * update showcase with latest parent id
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
      const response = await fetch(`https://api.subvind.com/showcases/${showcase.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${localStorage.getItem("access_token")}`
        },
        body: JSON.stringify({
          bannerPhoto: file
        }),
      });

      if (response.ok) {
        let merge = {
          ...showcase,
          ...await response.json(),
        }
        showcase = merge
        alert('The file for this showcase was saved.')
      } else {
        const errorData = await response.json();
        alert(errorData.error);
      }
    } catch (error) {
      console.error('Error updating showcase:', error);
      alert('An error occurred during submission.');
    }
  }

  /**
   * get the latest showcases by search
   */
  async function handleInput () {
    let search = ''
    if (filterText) {
      search = `&search=${filterText}`
    }
    const response = await fetch(`https://api.subvind.com/files/orgRelated/${organization.id}?limit=100&page=1${search}`, {
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
  <div class="row">
    <div class="col s12 m6">
      <br />
      {#if loading === false}
        <div>Select a banner photo: {filterText}</div>
        <Select bind:value {items} bind:filterText on:input={handleInput} on:change={handleChange} />
      {:else}
        <div class="progress red lighten-2">
          <div class="indeterminate teal lighten-2"></div>
        </div>
      {/if}
      {#if showcase.bannerPhoto}
        <br />
        <img src={`https://s3.us-east-2.amazonaws.com/${organization.orgname}.${showcase.bannerPhoto.bucket.name}/${showcase.bannerPhoto.filename}`} alt="">
      {/if}
    </div>
    <div class="col s12 m6">
      <p>Use a photo that best describes the showcase. This photo will be show in the slider on the homepage under the header on the frontned.</p>
      <UploadFile organizationId={organization.id} />
    </div>
  </div>
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