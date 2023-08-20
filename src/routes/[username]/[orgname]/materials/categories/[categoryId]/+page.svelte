<script lang="ts">
  import { onMount } from "svelte";

  import Settings from '$lib/materials/categories/Settings.svelte'
  import Products from '$lib/materials/categories/Products.svelte'
  import ParentCategory from '$lib/materials/categories/ParentCategory.svelte'

  export let data: any;
  let category: any = null;

  onMount(async () => {
    const response = await fetch(`https://backend.subvind.com/categories/slug/${data.categoryId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.ok) {
      category = await response.json();

      setTimeout(() => {
        let elms = document.querySelectorAll('.tabs')
        var instance = M.Tabs.init(elms, {});
      }, 0)
    } else {
      const errorData = await response.json();
      alert(errorData.error);
    }
  })
</script>

<nav class="nav-extended red darken-2">
  <div class="container">
    <div class="nav-wrapper">
      <a href="#" class="brand-logo white-text">Categories</a>
      <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
    </div>
  </div>
</nav>

<nav class="nav-extended red darken-2">
  <div class="container">
    <div class="nav-wrapper">
      {#if category}
        <a href="#" class="brand-logo">{category.name}</a>
      {/if}
      <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        {#if category && category.parentCategory}
          <li><a class="" href={`/${data.username}/${data.orgname}/materials/categories/${category.parentCategory.slug}`} target="_self">{category.parentCategory.name}</a></li>
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

<ul id="navigation" class="sidenav">
  <li><a href="sass.html">Sass</a></li>
  <li><a href="badges.html">Components</a></li>
  <li><a href="collapsible.html">JavaScript</a></li>
</ul>

{#if category}
  <div class="container">
    <div class="card main">
      <div id="profile" class="col s12">
        {JSON.stringify(category, null, 2)}
      </div>
      <div id="products" class="col s12">
        <Products data={data} category={category} />
      </div>
      <div id="subcategories" class="col s12">sub categories</div>
      <div id="parentcategory" class="col s12">
        <ParentCategory data={data} category={category} />
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