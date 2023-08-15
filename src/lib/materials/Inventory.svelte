<script lang="ts">
  import CreateInventory from "./CreateInventory.svelte";

  import Table from "$lib/Table.svelte"
  import * as gridjs from "gridjs";

  export let organization: any;
  let sort: boolean = true;
  let url: string = `https://backend.subvind.com/inventory/orgRelated/${organization.id}`;
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
      id: 'building',
      name: 'Building',
      width: '200px',
    },
    {
      id: 'floor',
      name: 'Floor',
      width: '150px',
    },
    {
      id: 'room',
      name: 'Room',
      width: '200px',
    },
    {
      id: 'rack',
      name: 'Rack',
      width: '200px',
    },
    {
      id: 'rackLevel',
      name: 'RackLevel',
      width: '150px',
    },
    {
      id: 'rackSection',
      name: 'RackSection',
      width: '200px',
    },
    {
      id: 'container',
      name: 'Container',
      width: '200px',
    },
    {
      id: 'createdAt',
      name: 'Created At',
      width: '200px',
    },
    { 
      name: '',
      width: '100px',
      sort: false,
      hidden: false,
      formatter: (cell: any, row: any) => {
        return gridjs.h('a', {
          href: `/${organization.orgname}/${organization.orgname}/${row.cells[1].data}`,
          target: "_self",
          className: 'btn btn-small red right',
        }, 'VIEW');
      }
    },
  ]
  function mapResultsFunc(value: any) {
    return [
      value.id,
      value.building,
      value.floor,
      value.room,
      value.rack,
      value.rackLevel,
      value.rackSection,
      value.container,
      value.createdAt
    ]
  }
</script>

<div class="table">
  <Table url={url} columns={columns} limit={limit} mapResultsFunc={mapResultsFunc} sort={sort} />
  {#if organization}
    <CreateInventory />
  {/if}
</div>

<style>
  /* .table {
    margin: 0 1em;
    padding-bottom: 1em;
  } */
</style>