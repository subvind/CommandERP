<script lang="ts">
  import CreateProduct from "./CreateProduct.svelte";

  import Table from "$lib/Table.svelte"
  import * as gridjs from "gridjs";

  export let organization: any;
  let sort: boolean = true;
  let url: string = `https://backend.subvind.com/products/orgRelated/${organization.id}`;
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
      id: 'name',
      name: 'Name',
      width: '200px',
    },
    {
      id: 'category',
      name: 'Category',
      width: '200px',
    },
    {
      id: 'coverPhoto',
      name: 'Cover Photo',
      width: '150px',
    },
    {
      id: 'bucket',
      name: 'bucket',
      width: '200px',
    },
    {
      id: 'ebayListing',
      name: 'Ebay Listing',
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
          href: `/${organization.orgname}/${organization.orgname}/materials/products/${row.cells[1].data}`,
          className: 'btn btn-small red right',
        }, 'VIEW');
      }
    },
  ]
  function mapResultsFunc(value: any) {
    console.log('value', value)
    return [
      value.id,
      value.stockKeepingUnit,
      value.name,
      value.category.name,
      value.coverPhoto,
      value.bucket,
      value.ebayListing,
      value.createdAt
    ]
  }
</script>

<div class="table">
  <Table url={url} columns={columns} limit={limit} mapResultsFunc={mapResultsFunc} sort={sort} />
  {#if organization}
    <CreateProduct />
  {/if}
</div>

<style>
  /* .table {
    margin: 0 1em;
    padding-bottom: 1em;
  } */
</style>