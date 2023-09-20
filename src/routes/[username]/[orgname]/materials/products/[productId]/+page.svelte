<script lang="ts">
  import { onMount } from "svelte";

  import Settings from '$lib/materials/products/Settings.svelte'
  import Category from '$lib/materials/products/Category.svelte'
  import Bucket from '$lib/materials/products/Bucket.svelte'
  import CoverPhoto from "$lib/materials/products/CoverPhoto.svelte";
  import Code from "$lib/Code.svelte";
  import CreateProduct from "$lib/materials/CreateProduct.svelte";
  import Delete from "$lib/materials/products/Delete.svelte";
  import CreateBucket from "$lib/organizations/CreateBucket.svelte";
  import UploadFile from "$lib/organizations/UploadFile.svelte";

  export let data: any;
  let organization: any;
  let product: any = null;
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

<nav class="nav-extended grey darken-4">
  <div class="container">
    <div class="nav-wrapper">
      <a href="#" class="brand-logo white-text">Products</a>
    </div>
  </div>
</nav>

<nav class="nav-extended grey darken-3">
  <div class="container">
    <div class="row" style="margin-bottom: 0;">
      <div class="col s12 m6">
        {#if product}
          <div style="line-height: 30px !important; display: inline-flex;"><a href={`#`}>{product.name}</a></div>
        {:else}
          <div style="line-height: 30px !important; display: inline-flex;"><a href={`#`}>Loading...</a></div>
        {/if}
      </div>
      <div class="col s12 m6">
        {#if product}
          <div style="text-align: right;"><a href={`https://${organization.orgname}.erpnomy.com/products/${product.stockKeepingUnit}`} target="_blank">{organization.orgname}.erpnomy.com/products/{product.stockKeepingUnit}</a></div>
        {/if}
      </div>
    </div>
    <div class="nav-content">
      {#if product}
        <ul class="tabs tabs-transparent black lighten-2">
          <li class="tab">
            <a class="active" href="#profile" on:click={() => section = 'profile'}>
              {product.stockKeepingUnit}
            </a>
          </li>
          <li class="tab"><a href="#parentproduct" on:click={() => section = 'category'}>category</a></li>
          <li class="tab"><a href="#photos" on:click={() => section = 'photos'}>photos</a></li>
          <li class="tab"><a href="#inventory" on:click={() => section = 'inventory'}>inventory</a></li>
        </ul>
      {/if}
    </div>
  </div>
</nav>

<div class="container">
  <div class="card main">
    {#if product && section === 'profile'}
      <div id="profile" class="col s12">
        <div class="card-content">
          <p>raw data:</p>
          <Code text={JSON.stringify(product, null, 2)} lang="json" />
        </div>
      </div>
    {/if}
    {#if product && section === 'category'}
      <div id="parentproduct" class="col s12">
        <Category data={data} product={product} />
      </div>
    {/if}
    {#if product && section === 'photos'}
      <div id="photos" class="col s12">
        <div class="row">
          <div class="col s12 m6 ">
            <Bucket data={data} product={product} />
          </div>
          <div class="col s12 m6">
            <p>Use a bucket name that is the same as this products SKU for clairity. All of the photos in this bucket will be shown on the frontend.</p>
            <CreateBucket organizationId={product.organization.id} />
          </div>
          <div class="col s12 m6">
            <CoverPhoto data={data} product={product} />
          </div>
          <div class="col s12 m6">
            <p>Use a photo that you want to be displayed as the main cover photo. Only this photo get's shown in the product lists on the frontend.</p>
            <UploadFile organizationId={product.organization.id} />
          </div>
        </div>
      </div>
    {/if}
    {#if product && section === 'inventory'}
      <div id="inventory" class="col s12">
        inventory
      </div>
    {/if}
  </div>
  {#if product && organization}
    <div class="controls">
      <Settings productId={product.id} />
    </div>
    <div class="controls">
      <CreateProduct organization={organization} />
    </div>
    <div class="controls">
      <Delete product={product} organization={organization} />
    </div>
  {/if}

  {#if !product}
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