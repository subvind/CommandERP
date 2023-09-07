<script lang="ts">
  import CreateCategory from "./CreateCategory.svelte";

  import Table from "$lib/Table.svelte"
  import * as gridjs from "gridjs";

  export let organization: any;
  let sort: boolean = true;
  let url: string = `https://backend.subvind.com/categories/orgRelated/${organization.id}`;
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
      id: 'photo',
      name: 'Main Photo',
      width: '150px',
      formatter: (cell: any, row: any) => {
        return gridjs.h('img', {
          src: `https://s3.us-east-2.amazonaws.com/${organization.orgname}.${row.cells[1].data}/${row.cells[2].data}`,
          alt: "",
          style: 'max-height: 100px; max-width: 100px;',
        }, 'VIEW');
      }
    },
    {
      id: 'filename',
      name: 'Filename',
      width: '300px',
      hidden: true
    },
    {
      id: 'name',
      name: 'Name',
      width: '200px',
    },
    {
      id: 'description',
      name: 'Description',
      width: '300px',
    },
    {
      id: 'slug',
      name: 'URL',
      width: '475px',
      formatter: (cell: any, row: any) => {
        return gridjs.h('a', {
          href: `https://${organization.orgname}.erpnomy.com/categories/${row.cells[5].data}`,
          target: '_blank'
        }, `${organization.orgname}.erpnomy.com/categories/${row.cells[5].data}`);
      }
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
          href: `/${organization.orgname}/${organization.orgname}/materials/categories/${row.cells[5].data}`,
          className: 'btn btn-small red right',
        }, 'VIEW');
      }
    },
  ]
  function mapResultsFunc(value: any) {
    return [
      value.id,
      value.mainPhoto?.bucket.name,
      value.mainPhoto?.filename,
      value.name,
      value.description,
      value.slug,
      value.createdAt,

    ]
  }
</script>

<div class="table">
  <Table url={url} columns={columns} limit={limit} mapResultsFunc={mapResultsFunc} sort={sort} />
  {#if organization}
    <CreateCategory />
  {/if}
</div>

<style>
  /* .table {
    margin: 0 1em;
    padding-bottom: 1em;
  } */
</style>