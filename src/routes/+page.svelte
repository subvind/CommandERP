<script lang="ts">
  import { onMount } from "svelte";
  import jwt_decode from 'jwt-decode';

  let accessToken: any = undefined
  let decoded: any = undefined

  onMount(() => {
    accessToken = localStorage.getItem('access_token');
    decoded = jwt_decode(accessToken);

    var elems = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(elems, {
      alignment: 'right'
    });
  })
</script>

<div class="banner">
  <br />
  <br />
  <br />
  <div class="container" style="max-width: 600px;">
    <div class="card">
      <div class="card-content">
        <strong>What is ERP?</strong>
        <h1 style="margin: 0;">Enterprise Resource Planning</h1>
        <br />
        <p>ERP is a system that optomizes the flow of</p>
        <h4 style="margin: 0;">
          <span class="blue">information,</span>
          <span class="red">materials,</span>
          <span class="green">and cash</span>
        </h4>
        <p>in an organization.</p>
        <br />
        {#if accessToken}
          <a href={`/${decoded.username}`} class="waves-effect yellow black-text lighten-2 btn username">{decoded.username}</a>
          <a href="/auth/logout" class="waves-effect black white-text btn">Logout</a>
        {:else}
          <a href="/auth/login" class="waves-effect black white-text btn">Login</a>
          <a href="/auth/register" class="waves-effect black white-text btn">Register</a>
        {/if}
      </div>
    </div>
  </div>
  <br />
  <br />
  <br />
</div>

<nav class="nav-extended yellow lighten-2">
  <div class="container">
    <div class="nav-wrapper">
      <a href="#" class="brand-logo black-text hide-on-med-and-down">Software as a Service (SaaS)</a>
    </div>
    
    <a href="#" data-target='dropdown1' class="btn-floating btn-large waves-effect waves-light black dropdown-trigger right" style="margin-top: -1.9em;"><i class="material-icons">more_vert</i></a>
    <!-- Dropdown Structure -->
    <ul id='dropdown1' class='dropdown-content'>
      <li><a href="#!">create new</a></li>
      <li class="divider" tabindex="-1"></li>
      <li><a href="#!">JSON import</a></li>
      <li><a href="#!">JSON export</a></li>
      <li class="divider" tabindex="-1"></li>
      <li><a href="#!">documentation</a></li>
      <li><a href="#!">pricing</a></li>
    </ul>
  </div>
</nav>
<br />
<br />

<div class="container" style="overflow: hidden;">
  <h2 style="text-align: center;">Best Open-Source ERP for Small and Medium Business</h2>
  <div class="row">
    <div class="col s12 m4">
      <h5 style="margin: 0 0 0.5em;">SaaS pricing start from 99$/month</h5>
      <ul class="collection">
        <li class="collection-item">Replace many apps like CRM, HR, Purchases, Orders, Payments, Invoices, Quotes, Inventory, Supply Chain, Expenses, Reports, Accounting all into one easy solution.</li>
        <li class="collection-item">Integrate with Ebay, Shopify, Magento, Etsy and add other products.</li>
        <li class="collection-item">Get fast customizations and support.</li>
      </ul>
      <a class="btn btn-large black" href="https://subvind.com">TRY FOR FREE</a>
      <br />
      <br />
    </div>
    <div class="col s12 m8" style="max-height: 700px;">
      <iframe class="zoomedIframe" src="https://autoide.subvind.com" frameborder="0" style="width: 205%; height: 2800px;"></iframe>
    </div>
  </div>
</div>
<br />
<br />

<div class="multi-channel">
  <h3>Increase Your Sales with Multichannel</h3>
  <img src="./logos/ebay.png" alt="" class="logo" style="width: 160px;">
  <img src="./logos/shopify.png" alt="" class="logo" style="width: 250px;">
  <img src="./logos/magento.png" alt="" class="logo" style="width: 250px;">
  <img src="./logos/woocommerce.png" alt="" class="logo" style="width: 100px;">
  <img src="./logos/etsy.png" alt="" class="logo" style="width: 120px;">
</div>


<style>
  .zoomedIframe {
    zoom: 0.5;
    -moz-transform: scale(0.5);
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
    transform-origin: 0 0;
    margin-bottom: -15em;
    padding-bottom: 0em;
  }

  .multi-channel {
    text-align: center;
  }
  .logo {
    margin: 1em 2em;
  }
  .dropdown-content {
    width: 200px !important;
  }
  .banner {
    background-color: #e5e5f7;
    opacity: 1;
    background-image:  linear-gradient(30deg, #9b9b9b 12%, transparent 12.5%, transparent 87%, #9b9b9b 87.5%, #9b9b9b), linear-gradient(150deg, #9b9b9b 12%, transparent 12.5%, transparent 87%, #9b9b9b 87.5%, #9b9b9b), linear-gradient(30deg, #9b9b9b 12%, transparent 12.5%, transparent 87%, #9b9b9b 87.5%, #9b9b9b), linear-gradient(150deg, #9b9b9b 12%, transparent 12.5%, transparent 87%, #9b9b9b 87.5%, #9b9b9b), linear-gradient(60deg, #9b9b9b77 25%, transparent 25.5%, transparent 75%, #9b9b9b77 75%, #9b9b9b77), linear-gradient(60deg, #9b9b9b77 25%, transparent 25.5%, transparent 75%, #9b9b9b77 75%, #9b9b9b77);
    background-size: 80px 140px;
    background-position: 0 0, 0 0, 40px 70px, 40px 70px, 0 0, 40px 70px;
  }
  .username {
    text-transform: none;
  }
  .green {
    color: green;
    background-color: transparent !important;
  }
  .blue {
    color: #039be5;
    background-color: transparent !important;
  }
  .red {
    color: red;
    background-color: transparent !important;
  }
</style>