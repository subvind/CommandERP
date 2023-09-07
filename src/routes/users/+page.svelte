<script lang="ts">
  import { onMount } from "svelte";

  import Table from "$lib/Table.svelte"
  import * as gridjs from "gridjs";

  let sort: boolean = true;
  let url: string = "https://backend.subvind.com/users";
  let limit: number = 25;
  let columns = [
    {
      id: 'id',
      name: 'Reference',
      width: '150px',
      sort: false,
      formatter: (cell: any, row: any) => {
        return gridjs.h('div', {
          style: 'width: 70px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;',
        }, row.cells[0].data);
      }
    },
    {
      id: 'username',
      name: 'Username',
      width: '200px',
    },
    {
      id: 'fullName',
      name: 'Full Name',
      width: '200px',
    },
    {
      id: 'joinDate',
      name: 'Join Date',
      width: '200px',
    },
    { 
      name: '',
      sort: false,
      hidden: false,
      formatter: (cell: any, row: any) => {
        return gridjs.h('a', {
          href: `/${row.cells[1].data}`,
          className: 'btn btn-small yellow black-text lighten-2 right',
        }, 'VIEW');
      }
    },
  ]
  function mapResultsFunc(value: any) {
    return [
      value.id,
      value.username,
      `${value.firstName} ${value.lastName}`,
      value.createdAt
    ]
  }

  onMount(() => {
    var elems = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(elems, {
      alignment: 'right'
    });
  })
</script>

<nav class="nav-extended yellow lighten-2">
  <div class="container">
    <div class="nav-wrapper">
      <a href="#" class="brand-logo black-text">Users</a>
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
<!-- {JSON.stringify(users)} -->

<div class="container">
  <Table url={url} columns={columns} limit={limit} mapResultsFunc={mapResultsFunc} sort={sort} />
</div>

<style>
  .dropdown-content {
    width: 200px !important;
  }
</style>