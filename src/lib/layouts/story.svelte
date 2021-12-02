<script context="module">
  import { page } from "$app/stores";
</script>

<script>
  export let title;
  export let slug;
  export let category;
  export let tags;
  export let linked;
  export let author;
  export let description;

  function writeClipboard(clipboardText) {
    var type = "text/plain";
    var blob = new Blob([clipboardText], { type });
    var data = [new ClipboardItem({ [type]: blob })];

    navigator.clipboard.write(data);
  }
</script>

<svelte:head>
  <title>{title} | Карманный Бард</title>
</svelte:head>

<div class="container m-auto max-w-xl  p-5 rounded-lg bg-base-100">
  <div class="flex">
    <h3 class="flex-1 flex-start font-normal">{category}</h3>
    <a class="flex-end btn btn-sm btn-sq" sveltekit:prefetch href="/">✕</a>
  </div>
  <div class="prose prose-sm font-serif">
    <h1>{title}</h1>
    <p>{description}</p>
    <p><slot /></p>
  </div>

  <div class="my-10 p-1 rounded">
    {#if linked && linked.length > 0}<b>Связанные истории:</b>
      {#each linked as link}<a class="link" sveltekit:prefetch href="./{link.slug}">{link.title}</a>{/each}
      <br />
    {/if}
    <b>Тэги:</b>
    {#each tags as tag}<span class="mx-1 badge rounded-md">{tag}</span>{/each}
    <br />
    <b>Автор:</b>
    {author}
  </div>

  <div class="mb-5 space-x-2">
    <a class="btn btn-sm btn-ghost rounded-md" sveltekit:prefetch href="/">Вернуться</a>
    <button class="btn btn-sm btn-outline rounded-md" on:click={() => writeClipboard($page.host + "/story/" + slug)}
      >Копировать ссылку</button
    >
  </div>
</div>
