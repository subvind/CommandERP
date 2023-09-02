<script lang="ts">
  import { onMount } from "svelte";
  import SelectBucket from "./SelectBucket.svelte";

  export let organizationId: any = null;
  let instances: any = undefined;
  let organization: any = null;
  let selectedFile: any = null;

  onMount(async () => {
    var elems = document.querySelectorAll('.adfgthhyehwffw');
    instances = M.Modal.init(elems, {});

    const response = await fetch(`https://backend.subvind.com/organizations/${organizationId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.ok) {
      organization = await response.json();

      setTimeout(() => {
        M.updateTextFields();
      }, 0)
    } else {
      const errorData = await response.json();
      alert(errorData.error);
    }
  })

  let bucket: any = null

  async function submit(event: any) {
    event.preventDefault();

    if (bucket === '') return alert('bucket must be selected.');
    if (!selectedFile) return alert('Please select a file.');

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await fetch(`https://backend.subvind.com/files/upload/${bucket.value}/${organizationId}`, {
        method: 'POST',
        body: formData, // Use FormData to send the selected file
      });

      if (response.ok) {
        let file = await response.json();
        window.location.href = `${organization.owner.username}/${organization.orgname}/files/${file.filename}`
      } else {
        const errorData = await response.json();
        alert(errorData.error);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('An error occurred during submission.');
    }
  }

  function handleFileSelect(event: any) {
    const files = event.target.files;
    if (files.length > 0) {
      selectedFile = files[0];
      // You can access the selected file using the 'selectedFile' variable.
      // For example, you can display the file name in the input field.
      const fileInput = event.target;
      fileInput.closest('.file-field').querySelector('.file-path').value = selectedFile.name;
    } else {
      selectedFile = null;
    }
  }
</script>

<!-- Modal Trigger -->
<a class="btn yellow lighten-2 black-text" href="#!" on:click={() => { instances[0].open() }}>UPLOAD FILE</a>

<!-- Modal Structure -->
<form on:submit={(e) => submit(e)}>
  <div class="modal adfgthhyehwffw">
    <div class="modal-content">
      <h4>Upload File</h4>
      <br />
      {#if organization}
        <SelectBucket bind:value={bucket} organization={organization} />
      {/if}
      <div class="row">
        <div class="file-field input-field col s12">
          <div class="btn">
            <span>Choose File</span>
            <input type="file" accept=".jpg,.jpeg,.png" on:change={handleFileSelect} />
          </div>
          <div class="file-path-wrapper">
            <input class="file-path validate" type="text" placeholder="Upload your file" readonly />
          </div>
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
    width: 500px;
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