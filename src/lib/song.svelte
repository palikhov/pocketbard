<script>
  export let title;
  export let category;
  export let tags;
  export let author;
  export let description;
</script>

<svelte:head>
  <title>{title} | Карманный Бард</title>
</svelte:head>

<div class="container mx-auto max-w-2xl p-5 rounded-lg bg-base-100">
  <div class="text-sm breadcrumbs">
    <ul>
      <li>
        <a href="/">все истории</a>
      </li>
      <li>
        {category}
      </li>
      <li />
    </ul>
  </div>

  <div class="prose">
    <h1>{title}</h1>
    <p>{description}</p>
    <p><slot /></p>
  </div>

  <div class="mt-20 p-1 rounded">
    <b>Тэги:</b>
    {#each tags as tag}<span class="mx-1 badge badge-outline rounded-md">{tag}</span>{/each}
    <br />
    <b>Автор:</b>
    {author}
  </div>
</div>
