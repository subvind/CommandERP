<script lang="ts">
  import { onMount } from "svelte";

  import Settings from '$lib/materials/categories/Settings.svelte'
  import Products from '$lib/materials/categories/Products.svelte'
  import SubCategories from "$lib/materials/categories/SubCategories.svelte";
  import ParentCategory from '$lib/materials/categories/ParentCategory.svelte'
  import MainPhoto from "$lib/materials/categories/MainPhoto.svelte";
  import Code from "$lib/Code.svelte";
  import CreateCategory from "$lib/materials/CreateCategory.svelte";
  import Delete from "$lib/materials/categories/Delete.svelte";
  import UploadFile from "$lib/organizations/UploadFile.svelte";

  export let data: any;
  let organization: any;
  let category: any = null;
  let section: any = '';

  onMount(async () => {
    // It retrieves the hash value from the URL and assigns it to the variable.
    function getHashValue() {
      return window.location.hash.substring(1); // Removes the "#" character
    }
    section = getHashValue() || 'profile';

    /**
     * fetch org
     */
    const responseOrg = await fetch(`https://api.subvind.com/organizations/orgname/${data.orgname}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (responseOrg.ok) {
      organization = await responseOrg.json();
    } else {
      const errorData = await responseOrg.json();
      alert(errorData.error);
    }

    /**
     * fetch category
     */
    const response = await fetch(`https://api.subvind.com/categories/slug/${data.categoryId}/${organization.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.ok) {
      category = await response.json();
    } else {
      const errorData = await response.json();
      alert(errorData.error);
    }

    setTimeout(() => {
      let elms = document.querySelectorAll('.tabs')
      var instance = M.Tabs.init(elms, {});
    }, 0)
  })
</script>

<nav class="nav-extended grey darken-4">
  <div class="container">
    <div class="nav-wrapper">
      <a href="#" class="brand-logo white-text">Categories</a>
    </div>
  </div>
</nav>

<nav class="nav-extended grey darken-3">
  <div class="container">
    <div class="row" style="margin-bottom: 0;">
      <div class="col s12 m6">
        {#if category}
          <div style="line-height: 30px !important; display: inline-flex;"><a href={`#`}>{category.name}</a></div>
        {:else}
          <div style="line-height: 30px !important; display: inline-flex;"><a href={`#`}>Loading...</a></div>
        {/if}
      </div>
      <div class="col s12 m6">
        {#if category}
          <div style="text-align: right;"><a href={`https://${category.organization.orgname}.erpnomy.subvind.com/categories/${category.slug}`} target="_blank">{category.organization.orgname}.erpnomy.subvind.com/categories/{category.slug}</a></div>
        {/if}
      </div>
    </div>
    <div class="nav-content">
      {#if category}
        <ul class="tabs tabs-transparent black lighten-2">
          <li class="tab">
            <a class="active" href="#profile" on:click={() => section = 'profile'}>
              {category.slug}
            </a>
          </li>
          <li class="tab"><a href="#products" on:click={() => section = 'products'}>products</a></li>
          <li class="tab"><a href="#subcategories" on:click={() => section = 'subcategories'}>sub categories</a></li>
          <li class="tab"><a href="#parentcategory" on:click={() => section = 'parentcategory'}>parent category</a></li>
        </ul>
      {/if}
    </div>
  </div>
</nav>

<div class="container">
  <div class="card main">
    {#if category && section === 'profile'}
      <div id="profile" class="col s12">
        <div class="card-content">
          <p>raw data:</p>
          <Code text={JSON.stringify(category, null, 2)} lang="json" />
        </div>
      </div>
    {/if}
    {#if category && section === 'products'}
      <div id="products" class="col s12">
        <Products data={data} category={category} />
      </div>
    {/if}
    {#if category && section === 'subcategories'}
      <div id="subcategories" class="col s12">
        <SubCategories data={data} category={category} />
      </div>
    {/if}
    {#if category && section === 'parentcategory'}
      <div id="parentcategory" class="col s12">
        <ParentCategory data={data} category={category} />
      </div>
    {/if}
  </div>
    
  {#if category}
    <ul class="tabs tabs-transparent black lighten-2">
      <li class="tab"><a href="#mainphoto" on:click={() => section = 'mainphoto'}>main photo</a></li>
    </ul>
  {/if}
    
  <div class="card main">
    {#if category && section === 'mainphoto'}
      <div id="mainphoto" class="col s12">
        <div class="row">
          <div class="col s12 m6">
            <MainPhoto data={data} category={category} />
          </div>
          <div class="col s12 m6">
            <p>Use a photo that best describes the products overall that are in this category. This photo will be show next to the category name on the frontned.</p>
            <UploadFile organizationId={category.organization.id} />
          </div>
        </div>
      </div>
    {/if}
  </div>

  {#if category && organization}
    <div class="controls">
      <Settings categoryId={category.id} />
    </div>
    <div class="controls">
      <CreateCategory organization={organization} />
    </div>
    <div class="controls">
      <Delete category={category} organization={organization} />
    </div>
  {/if}

  {#if !category}
    <br />
    <br />
    <br />
    <!-- show loading indicator -->
    <div class="progress red lighten-2">
      <div class="indeterminate teal lighten-2"></div>
    </div>
  {/if}
</div>

<style>
  .main {
    margin-top: 0;
    background: #aaa;
  }

  .controls {
    margin: 0 0.5em 0.5em 0;
  }
</style>