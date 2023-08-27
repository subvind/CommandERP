<script lang="ts">
  import { onMount } from "svelte";

  import CreateCategory from "../CreateCategory.svelte";

  import Table from "$lib/Table.svelte"
  import * as gridjs from "gridjs";

  export let data: any;
  export let category: any;
  let sort: boolean = true;
  let url: string = `https://backend.subvind.com/categories/categoryRelated/${category.id}`;
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
      id: 'name',
      name: 'Name',
      width: '150px',
    },
    {
      id: 'slug',
      name: 'Slug',
      width: '150px',
    },
    {
      id: 'description',
      name: 'Description',
      width: '300px',
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
          href: `/${data.username}/${data.orgname}/materials/categories/${row.cells[1].data}`,
          target: '_self',
          className: 'btn btn-small red right',
        }, 'VIEW');
      }
    },
  ]
  function mapResultsFunc(value: any) {
    return [
      value.id,
      value.name,
      value.slug,
      value.description,
      value.createdAt
    ]
  }
  onMount(() => {
    console.log('SubCategories')
  })
</script>

<div class="table">
  <Table url={url} columns={columns} limit={limit} mapResultsFunc={mapResultsFunc} sort={sort} />
  <CreateCategory />
</div>

<style>
  .table {
    margin: 0 1em;
    padding-bottom: 1em;
  }
</style>