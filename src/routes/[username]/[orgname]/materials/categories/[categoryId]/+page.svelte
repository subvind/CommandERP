<script lang="ts">
  import { onMount } from "svelte";

  import Settings from '$lib/materials/categories/Settings.svelte'
  import Products from '$lib/materials/categories/Products.svelte'
  import SubCategories from "$lib/materials/categories/SubCategories.svelte";
  import ParentCategory from '$lib/materials/categories/ParentCategory.svelte'
  import MainPhoto from "$lib/materials/categories/MainPhoto.svelte";

  export let data: any;
  let organization: any;
  let category: any = null;

  onMount(async () => {
    /**
     * fetch org
     */
    const responseOrg = await fetch(`https://backend.subvind.com/organizations/orgname/${data.orgname}`, {
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
    const response = await fetch(`https://backend.subvind.com/categories/slug/${data.categoryId}/${organization.id}`, {
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

<nav class="nav-extended red darken-2">
  <div class="container">
    <div class="nav-wrapper">
      <a href="#" class="brand-logo white-text">Categories</a>
    </div>
  </div>
</nav>

<nav class="nav-extended red darken-2">
  <div class="container">
    <div class="nav-wrapper">
      {#if category}
        <a href="#" class="brand-logo">{category.name}</a>
      {/if}
      <ul id="nav-mobile" class="right">
        {#if category}
          <li><a class="" href={`https://${category.organization.orgname}.erpnomy.com/categories/${category.slug}`} target="_blank">{category.organization.orgname}.erpnomy.com/categories/{category.slug}</a></li>
        {/if}
      </ul>
    </div>
    <div class="nav-content">
      <ul class="tabs tabs-transparent black lighten-2">
        {#if category}
          <li class="tab">
            <a class="active" href="#profile">
              {category.slug}
            </a>
          </li>
        {/if}
        <li class="tab"><a href="#products">products</a></li>
        <li class="tab"><a href="#subcategories">sub categories</a></li>
        <li class="tab"><a href="#parentcategory">parent category</a></li>
        {#if category}
          <div class="right" style="margin: 0.5em 0;"><Settings categoryId={category.id} /></div>
        {/if}
      </ul>
    </div>
  </div>
</nav>

{#if category}
  <div class="container">
    <div class="card main">
      <div id="profile" class="col s12">
        {JSON.stringify(category, null, 2)}
      </div>
      <div id="products" class="col s12">
        <Products data={data} category={category} />
      </div>
      <div id="subcategories" class="col s12">
        <SubCategories data={data} category={category} />
      </div>
      <div id="parentcategory" class="col s12">
        <ParentCategory data={data} category={category} />
      </div>
    </div>
  </div>

  <div class="container">
    <ul class="tabs tabs-transparent black lighten-2">
      <li class="tab"><a href="#mainphoto">main photo</a></li>
    </ul>
    
    <div class="card main">
      <div id="mainphoto" class="col s12">
        {#if category}
          <MainPhoto data={data} category={category} />
        {/if}
      </div>
    </div>
  </div>

{/if}

<style>
  .main {
    margin-top: 0;
    background: #aaa;
  }
</style>