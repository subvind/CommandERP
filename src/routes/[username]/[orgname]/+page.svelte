<script lang="ts">
  import { onMount } from "svelte";
  import jwt_decode from 'jwt-decode';

  export let data: any;

  onMount(async () => {
    try {
      const response = await fetch(`https://backend.subvind.com/users/defaultOrganization/${data.username}/${data.orgname}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        let res = await response.json();

        console.log('user', res)
      } else {
        const errorData = await response.json();
        alert(errorData.message);
      }
    } catch (error) {
      console.error('Error featching defaultOrganization:', error);
      alert('An error occurred during defaultOrganization.');
    }
  })
</script>


{data.username}/{data.orgname}