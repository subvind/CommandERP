<script lang="ts">
  import { onMount } from "svelte";

  export let productId: any = null;
  let instances: any = undefined;
  let product: any = undefined;

  onMount(async () => {
    var elems = document.querySelectorAll('.sdffdddfsftgrtgsfd');
    instances = M.Modal.init(elems, {});

    const response = await fetch(`https://backend.subvind.com/products/${productId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.ok) {
      product = await response.json();
      name = product.name
      stockKeepingUnit = product.stockKeepingUnit
      description = product.description
      ebayItem = product.ebayItem
      etsyItem = product.etsyItem
      detail = product.detail
      price = product.price
      shippingCost = product.shippingCost

      setTimeout(() => {
        M.updateTextFields();
      }, 0)
    } else {
      const errorData = await response.json();
      alert(errorData.error);
    }
  })

  let name = ''
  let stockKeepingUnit = ''
  let description = ''
  let ebayItem = ''
  let etsyItem = ''
  let detail = ''
  let price = ''
  let shippingCost = ''

	async function submit(event: any) {
    event.preventDefault()

    if (name === '') return alert('Name must be defined.')
    if (stockKeepingUnit === '') return alert('SKU must be defined.')
    
    try {
      const response = await fetch(`https://backend.subvind.com/products/${productId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          stockKeepingUnit,
          description,
          ebayItem,
          etsyItem,
          detail,
          price,
          shippingCost,
        }),
      });

      if (response.ok) {
        product = await response.json();
        window.location.reload();
      } else {
        const errorData = await response.json();
        alert(errorData.error);
      }
    } catch (error) {
      console.error('Error updating product:', error);
      alert('An error occurred during submission.');
    }
  }

  function formatCurrency(input: any) {
    // Remove all non-numeric characters
    const numericValue = input.replace(/[^0-9]/g, '');

    // Convert the numeric value to cents (integer)
    const centsValue = parseInt(numericValue, 10);

    // Format as USD currency with two decimal places
    const dollars = Math.floor(centsValue / 100);
    const cents = centsValue % 100;
    const formattedValue = `${dollars}.${cents.toString().padStart(2, '0')}`;

    return `$${formattedValue}`;
  }

  let priceFormated = ''
  function handlePriceChange(event: any) {
    const newValue = event.target.value;
    priceFormated = formatCurrency(newValue);
  }
  let shippingCostFormated = ''
  function handleShippingCostChange(event: any) {
    const newValue = event.target.value;
    shippingCostFormated = formatCurrency(newValue);
  }
</script>

<!-- Modal Trigger -->
<a class="btn red darken-2" href="#!" on:click={() => { instances[0].open() }}>EDIT PRODUCT</a>

<!-- Modal Structure -->
<form on:submit={(e) => submit(e)}>
  <div class="modal sdffdddfsftgrtgsfd">
    <div class="modal-content">
      <h4>Settings</h4>
      <br />
      <div class="row">
        <div class="input-field col s12 m6">
          <input id="name" type="text" class="validate" bind:value={name}>
          <label for="name">Name</label>
          <span class="helper-text">Shown as the title. Use all lowercase letters. Around half a sentence.</span>
        </div>
        <div class="input-field col s12 m6">
          <input id="stockKeepingUnit" type="text" class="validate" bind:value={stockKeepingUnit}>
          <label for="stockKeepingUnit">SKU</label>
          <span class="helper-text">A number that is unique.</span>
        </div>
      </div>
      {#if stockKeepingUnit}
        <div class="row">
          <div class="col s12">
            <span>Catalog:</span><br />
            <a href={`https://${product.organization.orgname}.erpnomy.com/products/${stockKeepingUnit}`} target="_blank">https://{product.organization.orgname}.erpnomy.com/products/{stockKeepingUnit}</a>
            <br />
            <br />
          </div>
        </div>
      {/if}
      <div class="row">
        <div class="input-field col s12">
          <input id="description" type="text" class="validate" bind:value={description}>
          <label for="description">Description</label>
          <span class="helper-text">Shown next to the title. Around one sentence.</span>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <textarea id="defailt" class="materialize-textarea" bind:value={detail}></textarea>
          <label for="detail">Detail</label>
          <span class="helper-text">Shown on the product page. At least a couple of sentences.</span>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12 m6">
          <input type="number" id="price-input" class="validate" bind:value={price} on:input={handlePriceChange}>
          <label for="price-input">Price {priceFormated}</label>
          <span class="helper-text">Number in pennies.</span>
        </div>
        <div class="input-field col s12 m6">
          <input type="number" id="shippingCost-input" class="validate" bind:value={shippingCost} on:input={handleShippingCostChange}>
          <label for="shippingCost-input">Shipping Cost {shippingCostFormated}</label>
          <span class="helper-text">Number in pennies.</span>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s6">
          <input id="ebayItem" type="text" class="validate" bind:value={ebayItem}>
          <label for="ebayItem">Ebay Item</label>
          <span class="helper-text">Optional. Shown on the product page as a button.</span>
        </div>
        <div class="input-field col s6">
          <input id="etsyItem" type="text" class="validate" bind:value={etsyItem}>
          <label for="etsyItem">Etsy Item</label>
          <span class="helper-text">Optional. Shown on the product page as a button.</span>
        </div>
      </div>
      <div class="row">
        {#if ebayItem}
          <div class="col s12">
            <span>eBay:</span><br />
            <a href={`https://ebay.com/itm/${ebayItem}`} target="_blank">https://ebay.com/itm/{ebayItem}</a>
          </div>
        {/if}
        {#if etsyItem}
          <div class="col s12">
            <span>Etsy:</span><br />
            <a href={`https://etsy.com/listing/${etsyItem}`} target="_blank">https://etsy.com/listing/{etsyItem}</a>
          </div>
        {/if}
      </div>
    </div>
    <div class="modal-footer">
      <a class="waves-effect waves-black btn-flat" href="#!" on:click={() => { instances[0].close() }}>Cancel</a>
      <button type='submit' class="waves-effect btn red darken-2">Submit</button>
    </div>
  </div>
</form>

<style>
  .modal {
    color: #333;
    width: 500px;
  }

  .row {
    margin-bottom: 0;
  }

  :global(nav) .modal .input-field {
    margin: 1em 0;
    height: 100%;
  }

  :global(nav) .modal .input-field input {
    border-bottom: 1px solid;
  }
</style>