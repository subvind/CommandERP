<script lang="ts">
	import { onMount } from "svelte";
  import jwt_decode from 'jwt-decode';

  let decodedToken: any = null;
  let user: any;
	let loading: boolean = false;
	
	async function verifyEmail(event: any) {
    event.preventDefault()
    
    loading = true

    try {
      const response = await fetch(`https://api.subvind.com/users/verifyEmail/${user.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${localStorage.getItem("access_token")}`
        },
        body: JSON.stringify({}),
      });

      if (response.ok) {
				let res = await response.json();

				alert('Verify email code sent successfully.')
      } else {
        const errorData = await response.json();
        alert(errorData.error);
      }
    } catch (error) {
      console.error('Error registering user:', error);
      alert('An error occurred during submission.');
    }

    loading = false
  }

  async function load() {
    const response = await fetch(`https://api.subvind.com/users/username/${decodedToken.username}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
				'authorization': `Bearer ${localStorage.getItem("access_token")}`
      }
    });

    if (response.ok) {
      user = await response.json();
    } else {
      const errorData = await response.json();
      alert(errorData.error);
    }
  }

	onMount(async () => {
    let accessToken: any = localStorage.getItem('access_token');

    // Decode the JWT
    decodedToken = jwt_decode(accessToken);

    await load()
	})
</script>

<svelte:head>
  <title>Allow subvind to access ebay - Declined - nomy.ERP</title>
	<meta name="description" content="About this app" />
</svelte:head>

<br />
<br />
<div class="container">
  <div class="card">
    <div class="card-content">
      <h4>Declined!</h4>
    
      <p>Allow subvind to access ebay.</p>
    </div>
  </div>
</div>

<style>
  h4 {
    margin: 0;
  }
</style>