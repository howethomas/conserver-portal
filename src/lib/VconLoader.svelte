<script>
  let file;
  /**
	 * @type {any}
	 */
  let content;

  const handleChange = (/** @type {{ target: { files: any[]; }; }} */ event) => {
    file = event.target.files[0];
    if (file) {
      try {
        const reader = new FileReader();
        reader.onload = event => {
          content = JSON.parse(event.target.result);
          // POST this to the vCon API, use fetch with options.
          fetch("http://localhost:8000"+ "/vcon", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(content)
          })

        };
        reader.readAsText(file);
      } catch (error) {
        console.error('An error occurred while reading the JSON file:', error);
      }
    }
  };
</script>

<style>
  /* Add some styling here if needed */
</style>

<div class="text-xs">
  <label for="jsonFile">Upload a vCon file:</label>
  <input type="file" id="jsonFile" accept=".json" on:change={handleChange} />
</div>

