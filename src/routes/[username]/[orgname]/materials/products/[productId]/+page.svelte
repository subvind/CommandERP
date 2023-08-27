<script lang="ts">
  import { onMount } from "svelte";

  import Settings from '$lib/materials/products/Settings.svelte'
  import Products from '$lib/materials/products/Products.svelte'
  import SubCategories from "$lib/materials/products/SubCategories.svelte";
  import ParentCategory from '$lib/materials/products/ParentCategory.svelte'

  export let data: any;
  let organization: any;
  let product: any = null;

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
     * fetch product
     */
    const response = await fetch(`https://backend.subvind.com/products/sku/${data.productId}/${organization.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.ok) {
      product = await response.json();
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
      <a href="#" class="brand-logo white-text">Products</a>
    </div>
  </div>
</nav>

<nav class="nav-extended red darken-2">
  <div class="container">
    <div class="nav-wrapper">
      {#if product}
        <a href="#" class="brand-logo">{product.name}</a>
      {/if}
    </div>
    <div class="nav-content">
      <ul class="tabs tabs-transparent black lighten-2">
        {#if product}
          <li class="tab">
            <a class="active" href="#profile">
              {product.stockKeepingUnit}
            </a>
          </li>
        {/if}
        <li class="tab"><a href="#products">products</a></li>
        <li class="tab"><a href="#subcategories">sub categories</a></li>
        <li class="tab"><a href="#parentproduct">parent product</a></li>
        {#if product}
          <div class="right" style="margin: 0.5em 0;"><Settings productId={product.id} /></div>
        {/if}
      </ul>
    </div>
  </div>
</nav>

{#if product}
  <div class="container">
    <div class="card main">
      <div id="profile" class="col s12">
        {JSON.stringify(product, null, 2)}
      </div>
      <div id="products" class="col s12">
        <Products data={data} product={product} />
      </div>
      <div id="subcategories" class="col s12">
        <SubCategories data={data} product={product} />
      </div>
      <div id="parentproduct" class="col s12">
        <ParentCategory data={data} product={product} />
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