<script lang="ts">
  export let username: any
  export let orgname: any
</script>

<nav class="black">
  <div class="nav-wrapper">
    <a href={`/${username}/${orgname}#suppliers`} class="brand-logo left">suppliers &larr;</a>
    <a href={`/${username}/${orgname}#employees`} class="brand-logo center">&larr; employees &rarr; </a>
    <a href={`/${username}/${orgname}#customers`} class="brand-logo right">&larr;	customers</a>
  </div>
</nav>
<nav class="green darken-4">
  <div class="nav-wrapper">
    <ul class="left hide-on-med-and-down">
      <li><a href={`/${username}/${orgname}/cash/accounts-payables`}>Accounts Payables</a></li>
      <li><a href={`/${username}/${orgname}/cash/supplier-invoices`}>Supplier Invoices</a></li>
      <li><a href={`/${username}/${orgname}/cash/supplier-payments`}>Payments</a></li>
    </ul>
    
    <ul class="center hide-on-med-and-down" style="margin: 0 auto;">
      <li><a href={`/${username}/${orgname}/cash/general-ledger`}>General Ledger</a></li>
    </ul>
    <!-- <a href="#" class="brand-logo center"></a> -->
    
    <ul class="right hide-on-med-and-down">
      <li><a href={`/${username}/${orgname}/cash/aaccounts-receivables`}>Accounts Receivables</a></li>
      <li><a href={`/${username}/${orgname}/cash/customer-invoices`}>Customer Invoices</a></li>
      <li><a href={`/${username}/${orgname}/cash/customer-payments`}>Payments</a></li>
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