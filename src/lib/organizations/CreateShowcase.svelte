<script lang="ts">
  import { onMount } from "svelte";

  export let organizationId: any = null;
  let instances: any = undefined;
  let organization: any = null;

  onMount(async () => {
    var elems = document.querySelectorAll('.rthhyrthtfjuyjuyfr');
    instances = M.Modal.init(elems, {});

    const response = await fetch(`https://backend.subvind.com/organizations/${organizationId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.ok) {
      organization = await response.json();
    } else {
      const errorData = await response.json();
      alert(errorData.error);
    }

    setTimeout(() => {
      M.updateTextFields();

      var elems1 = document.querySelectorAll('.datepicker1');
      var elems2 = document.querySelectorAll('.datepicker2');
      var instances = M.Datepicker.init(elems1, {
        format: 'yyyy-mm-dd',
        onSelect: function (date: any) {
          startAt = date;
        },
      });
      var instances = M.Datepicker.init(elems2, {
        format: 'yyyy-mm-dd',
        onSelect: function (date: any) {
          finishAt = date;
        },
      });
    }, 0)
  })

  let title = ''
  let startAt = ''
  let finishAt = ''

	async function submit(event: any) {
    event.preventDefault()

    if (title === '') return alert('Showcase title must be defined.');
    if (startAt === '') return alert('Showcase Start At must be defined.');
    if (finishAt === '') return alert('Showcase Finish At must be defined.');

    try {
      const response = await fetch(`https://backend.subvind.com/showcases`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          startAt,
          finishAt,
          organization: {
            id: organizationId
          }
        }),
      });

      if (response.ok) {
        let showcase = await response.json();
        window.location.href = `${organization.owner.username}/${organization.orgname}/showcases/${showcase.id}`
      } else {
        const errorData = await response.json();
        alert(errorData.error);
      }
    } catch (error) {
      console.error('Error creating showcase:', error);
      alert('An error occurred during submission.');
    }
  }
</script>

<!-- Modal Trigger -->
<a class="btn yellow lighten-2 black-text" href="#!" on:click={() => { instances[0].open() }}>CREATE SHOWCASE</a>

<!-- Modal Structure -->
<form on:submit={(e) => submit(e)}>
  <div class="modal rthhyrthtfjuyjuyfr">
    <div class="modal-content">
      <h4>Create Showcase</h4>
      <br />
      <div class="row">
        <div class="input-field col s12">
          <input id="title" type="text" class="validate" bind:value={title}>
          <label for="title">title</label>
        </div>
        <div class="input-field col m6">
          <input id="startAt" type="text" class="datepicker1" bind:value={startAt}>
          <label for="startAt">Start At</label>
        </div>
        <div class="input-field col m6">
          <input id="finishAt" type="text" class="datepicker2" bind:value={finishAt}>
          <label for="finishAt">Finish At</label>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <a class="waves-effect waves-black btn-flat" href="#!" on:click={() => { instances[0].close() }}>Cancel</a>
      <button type='submit' class="waves-effect btn yellow black-text lighten-2">Submit</button>
    </div>
  </div>
</form>

<style>
  .modal {
    color: #333;
    width: 750px;
    min-height: 500px;
  }

  .row {
    margin-bottom: 0;
  }

  :global(nav) .modal .input-field {
    margin: 1em 0;
    height: 100%;
  }

  :global(nav) .modal .input-field input {
    border-bottom: 1px solid;
  }
</style>