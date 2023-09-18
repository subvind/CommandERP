<script lang="ts">
  export let username: any
  export let orgname: any
</script>

<nav class="black">
  <div class="nav-wrapper">
    <a href={`/${username}/${orgname}#suppliers`} class="brand-logo left">suppliers &rarr;</a>
    <a href={`/${username}/${orgname}#employees`} class="brand-logo center">&larr; employees &rarr; </a>
    <a href={`/${username}/${orgname}#customers`} class="brand-logo right">&rarr;	customers</a>
  </div>
</nav>
<nav class="red darken-2">
  <div class="nav-wrapper">
    <ul class="left hide-on-med-and-down">
      <li>
        <a href={`/${username}/${orgname}/materials/receipts`}>Material Receipts</a>
      </li>
    </ul>
    
    <ul class="center hide-on-med-and-down" style="margin: 0 auto;">
      <li><a href={`/${username}/${orgname}/materials/inventory`}>Inventory</a></li>
      <li><a href={`/${username}/${orgname}/materials/products`}>Products</a></li>
      <li><a href={`/${username}/${orgname}/materials/categories`}>Categories</a></li>
      <li><a href={`/${username}/${orgname}/materials/production`}>Production</a></li>
    </ul>
    <!-- <a href="#" class="brand-logo center"></a> -->
    
    <ul class="right hide-on-med-and-down">
      <li>
        <a href={`/${username}/${orgname}/materials/shipments`}>Shipments</a>
      </li>
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