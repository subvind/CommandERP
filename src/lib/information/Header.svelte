<script lang="ts">
  export let username: any
  export let orgname: any
</script>

<nav class="black">
  <div class="nav-wrapper">
    <a href="/organizations/acme/suppliers" class="brand-logo left">suppliers &larr;</a>
    <a href="/organizations/acme/employees" class="brand-logo center">&larr; employees &rarr; </a>
    <a href="/organizations/acme/customers" class="brand-logo right">&larr;	customers</a>
  </div>
</nav>
<nav class="blue darken-2">
  <div class="nav-wrapper">
    <ul class="left hide-on-med-and-down">
      <li><a href={`/${username}/${orgname}/information/request-for-quotations`}>Request for Quotations</a></li>
      <li><a href={`/${username}/${orgname}/information/purchase-requisitions`}>Purchase Requisitions</a></li>
      <li><a href={`/${username}/${orgname}/information/purchase-orders`}>Purchase Orders</a></li>
    </ul>
    
    <ul class="center hide-on-med-and-down" style="margin: 0 auto;">
      <li><a href={`/${username}/${orgname}/information/planning`}>Planning</a></li>
      <li><a href={`/${username}/${orgname}/information/production`}>Production</a></li>
    </ul>
    <!-- <a href="#" class="brand-logo center"></a> -->
    
    <ul class="right hide-on-med-and-down">
      <li><a href={`/${username}/${orgname}/information/quotes`}>Quotes</a></li>
      <li><a href={`/${username}/${orgname}/information/sales-orders`}>Sales Orders</a></li>
      <li><a href={`/${username}/${orgname}/information/sales-forecast`}>Sales Forecast</a></li>
    </ul>
  </div>
</nav>

<style>
  .brand-logo.left,
  .brand-logo.right {
    margin: 0 0.5em;
  }

  .center {
    position: absolute;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
  }
</style>