<script lang="ts">
  import { onMount } from "svelte";

  onMount(() => {

  })

  function openMainNavigation() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, {});
    instances[0].open()
  }
</script>


<ul id="slide-out" class="sidenav">
  <li><div class="user-view">
    <div class="background">
      <img src="images/office.jpg">
    </div>
    <a href="#user"><img class="circle" src="images/yuna.jpg"></a>
    <a href="#name"><span class="white-text name">John Doe</span></a>
    <a href="#email"><span class="white-text email">jdandturk@gmail.com</span></a>
  </div></li>
  <li><a href="#!"><i class="material-icons">cloud</i>First Link With Icon</a></li>
  <li><a href="#!">Second Link</a></li>
  <li><div class="divider"></div></li>
  <li><a class="subheader">Subheader</a></li>
  <li><a class="waves-effect" href="#!">Third Link With Waves</a></li>
</ul>

<ul id="nav-mobile" class="left hide-on-med-and-down">
  <li>
    <a href="#" on:click={() => openMainNavigation()}>Request for Quotation</a>
  </li>
  <li><a href="#">Purchase Requisition</a></li>
  <li><a href="#">Purchase Order</a></li>
</ul>

<ul id="nav-mobile" class="center hide-on-med-and-down" style="margin: 0 auto;">
  <li><a href="#">Planning</a></li>
  <li><a href="#">Production</a></li>
</ul>
<!-- <a href="#" class="brand-logo center"></a> -->

<ul id="nav-mobile" class="right hide-on-med-and-down">
  <li>
    <a href="#" on:click={() => openMainNavigation()}>Quotes</a>
  </li>
  <li>
    <a href="#" on:click={() => openMainNavigation()}>Sales Orders</a>
  </li>
  <li>
    <a href="#" on:click={() => openMainNavigation()}>Sales Forecast</a>
  </li>
</ul>

<style>
  .center {
    position: absolute;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
  }
</style>