<script lang="ts">
  import { onMount } from "svelte";

  import Settings from '$lib/materials/products/Settings.svelte'
  import Category from '$lib/materials/products/Category.svelte'
  import Bucket from '$lib/materials/products/Bucket.svelte'
  import CoverPhoto from "$lib/materials/products/CoverPhoto.svelte";
  import Code from "$lib/Code.svelte";
  import CreateProduct from "$lib/materials/CreateProduct.svelte";
  import Delete from "$lib/materials/products/Delete.svelte";

  export let data: any;
  let organization: any;
  let product: any = null;

  onMount(async () => {
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
     * fetch product
     */
    const response = await fetch(`https://api.subvind.com/products/sku/${data.productId}/${organization.id}`, {
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
    <div class="row" style="margin-bottom: 0;">
      <div class="col s12 m6">
        {#if product}
          <div style="line-height: 30px !important; display: inline-flex;"><a href={`#`}>{product.name}</a></div>
        {/if}
      </div>
      <div class="col s12 m6">
        {#if product}
          <div style="text-align: right;"><a href={`https://${organization.orgname}.erpnomy.com/products/${product.stockKeepingUnit}`} target="_blank">{organization.orgname}.erpnomy.com/products/{product.stockKeepingUnit}</a></div>
        {/if}
      </div>
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
        <li class="tab"><a href="#parentproduct">category</a></li>
        <li class="tab"><a href="#photos">photos</a></li>
        <li class="tab"><a href="#inventory">inventory</a></li>
      </ul>
    </div>
  </div>
</nav>

{#if product && organization}
  <div class="container">
    <div class="card main">
      <div id="profile" class="col s12">
        <div class="card-content">
          <p>raw data:</p>
          <Code text={JSON.stringify(product, null, 2)} lang="json" />
        </div>
      </div>
      <div id="parentproduct" class="col s12">
        <Category data={data} product={product} />
      </div>
      <div id="photos" class="col s12">
        <Bucket data={data} product={product} />
        <CoverPhoto data={data} product={product} />
      </div>
      <div id="inventory" class="col s12">
        inventory
      </div>
    </div>
    <div class="controls">
      <Settings productId={product.id} />
    </div>
    <div class="controls">
      <CreateProduct organization={organization} />
    </div>
    <div class="controls">
      <Delete product={product} organization={organization} />
    </div>
  </div>
{/if}

<style>
  .main {
    margin-top: 0;
    background: #aaa;
  }

  .controls {
    margin: 0 0.5em 0.5em 0;
  }
</style>