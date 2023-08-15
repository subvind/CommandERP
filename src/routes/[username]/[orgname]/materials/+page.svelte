<script lang="ts">
  
  import { page } from '$app/stores';
  import { onMount } from 'svelte';

  let username;
  let orgname;

  onMount(() => {
    username = $page.params.username;
    orgname = $page.params.orgname;
  });
</script>

<br />
<div class="container">
  <h5>Materials</h5>
  <p>Materials within an Enterprise Resource Planning (ERP) system refer to the tangible resources that a company requires to conduct its operations and fulfill its business objectives. These resources can encompass a wide range of items, including raw materials, components, finished products, equipment, and supplies. In an ERP context, materials are managed through integrated modules that handle various aspects of their lifecycle, such as procurement, inventory management, production planning, and distribution. Effective material management within an ERP system allows organizations to optimize their supply chain, streamline processes, maintain accurate inventory levels, and make informed decisions based on real-time data, contributing to increased operational efficiency and improved resource utilization.</p>
</div>


<style>
</style>