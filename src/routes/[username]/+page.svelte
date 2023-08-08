<script lang="ts">
  import { onMount } from "svelte";

  export let data: any;
  let user: any = null;

  onMount(async () => {
    const response = await fetch(`https://backend.subvind.com/users/username/${data.username}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.ok) {
      user = await response.json();
    } else {
      const errorData = await response.json();
      alert(errorData.error);
    }
  })
</script>

{JSON.stringify(user)}
test