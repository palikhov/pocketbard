<script>
  import "../app.css";
  import Header from "$lib/components/Header.svelte";
</script>

<div class="bg-base-200">
  <div class="container mx-auto max-w-screen-lg min-h-screen p-4">
    <Header />
    <slot />
  </div>
</div>
