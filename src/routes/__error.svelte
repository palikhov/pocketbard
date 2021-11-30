<script context="module">
  /** @type {import('@sveltejs/kit').ErrorLoad} */
  export function load({ error, status }) {
    return {
      props: {
        errorStatus: status,
        errorMessage: error.message,
      },
    };
  }
</script>

<script>
  export let errorStatus;
  export let errorMessage;
</script>

<div class="prose  min-h-screen items-center">
  {#if errorStatus == "404"}
    <h1>Страница не найдена</h1>
  {:else}
    <h1>Неизвестная ошибка</h1>
  {/if}
  <p>{errorStatus} - {errorMessage}</p>
</div>
