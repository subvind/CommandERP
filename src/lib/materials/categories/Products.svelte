<script lang="ts">
  import { onMount } from "svelte";

  import CreateProduct from "../CreateProduct.svelte";

  import Table from "$lib/Table.svelte"
  import * as gridjs from "gridjs";

  export let data: any;
  export let category: any;
  let sort: boolean = true;
  let url: string = `https://backend.subvind.com/products/categoryRelated/${category.id}`;
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
      id: 'stockKeepingUnit',
      name: 'SKU',
      width: '200px',
    },
    {
      id: 'photoUrl',
      name: 'Photo URL',
      width: '150px',
    },
    {
      id: 'createdAt',
      name: 'Created At'
    },
    { 
      name: '',
      sort: false,
      hidden: false,
      formatter: (cell: any, row: any) => {
        return gridjs.h('a', {
          href: `/${data.username}/${row.cells[1].data}`,
          target: "_self",
          className: 'btn btn-small yellow black-text lighten-2 right',
        }, 'VIEW');
      }
    },
  ]
  function mapResultsFunc(value: any) {
    return [
      value.id,
      value.stockKeepingUnit,
      value.photoUrl,
      value.createdAt
    ]
  }
</script>

<div class="table">
  <Table url={url} columns={columns} limit={limit} mapResultsFunc={mapResultsFunc} sort={sort} />
  <CreateProduct  />
</div>

<style>
  .table {
    margin: 0 1em;
    padding-bottom: 1em;
  }
</style>