<script lang="ts">
  import { onMount } from "svelte";

  import Table from "$lib/Table.svelte"
  import * as gridjs from "gridjs";

  let sort: boolean = true;
  let url: string = "https://backend.subvind.com/organizations";
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
      id: 'orgname',
      name: 'Orgname'
    },
    {
      id: 'displayName',
      name: 'Display Name'
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
          href: `${row.cells[4].data}/${row.cells[1].data}`,
          className: 'btn btn-small yellow black-text lighten-2 right',
        }, 'VIEW');
      }
    },
  ]
  function mapResultsFunc(value: any) {
    console.log('value', value)
    return [
      value.id,
      value.orgname,
      value.displayName,
      value.createdAt,
      value.owner.username
    ]
  }

</script>

<br />
<br />
<!-- {JSON.stringify(users)} -->

<div class="container">
  <Table url={url} columns={columns} limit={limit} mapResultsFunc={mapResultsFunc} sort={sort} />
</div>