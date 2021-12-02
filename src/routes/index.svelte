<script context="module">
  const stories = import.meta.glob("./story/*.svx");

  let body = [];
  for (const path in stories) {
    body.push(stories[path]().then(({ metadata }) => metadata));
  }

  export async function load() {
    const storyData = await Promise.all(body);
    return {
      props: {
        storyData,
      },
    };
  }
</script>

<script>
  import MdErrorOutline from "svelte-icons/md/MdErrorOutline.svelte";
  import GiCastle from "svelte-icons/gi/GiCastle.svelte";
  import GiWomanElfFace from "svelte-icons/gi/GiWomanElfFace.svelte";
  import GiSpikedDragonHead from "svelte-icons/gi/GiSpikedDragonHead.svelte";
  import GiMagicSwirl from "svelte-icons/gi/GiMagicSwirl.svelte";
  import GiLockedChest from "svelte-icons/gi/GiLockedChest.svelte";

  export let storyData;

  let tagFilter = "";
  let categoryFilter = "сцена";

  $: tagged = storyData
    .filter((story) => {
      return (
        (story.title.toLowerCase().includes(tagFilter.toLowerCase()) ||
          story.description.toLowerCase().includes(tagFilter.toLowerCase()) ||
          story.tags.some((tag) => tag.toLowerCase().includes(tagFilter.toLowerCase()))) &&
        story.category.toLowerCase().includes(categoryFilter.toLowerCase())
      );
    })
    .sort(sortBy("title"));

  function setTag(newTag) {
    tagFilter = newTag;
  }

  function setCategory(newCategory) {
    categoryFilter = newCategory;
  }

  const sortBy = (key) => {
    return (a, b) => (a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0);
  };
</script>

<svelte:head>
  <title>Карманный Бард</title>
</svelte:head>

<h1 class="mb-10 text-3xl font-bold">Карманный Бард</h1>

<div class="flex text-sm font-normal space-x-2">
  <button class="text-success flex" class:link={categoryFilter == "сцена"} on:click={() => setCategory("сцена")}
    ><span class="inline-block w-5 h-5"><GiCastle /></span>Сцены</button
  >
  <button class="text-info flex" class:link={categoryFilter == "персонаж"} on:click={() => setCategory("персонаж")}
    ><span class="inline-block w-5 h-5"><GiWomanElfFace /></span>Персонажи</button
  >
  <button class="text-error flex" class:link={categoryFilter == "существо"} on:click={() => setCategory("существо")}
    ><span class="inline-block w-5 h-5"><GiSpikedDragonHead /></span>Существа</button
  >
  <button class="text-purple-400 flex" class:link={categoryFilter == "заклинание"} on:click={() => setCategory("заклинание")}
    ><span class="inline-block w-5 h-5"><GiMagicSwirl /></span>Заклинания</button
  >
  <button class="text-neutral-content flex" class:link={categoryFilter == "предмет"} on:click={() => setCategory("предмет")}
    ><span class="inline-block w-5 h-5"><GiLockedChest /></span>Предметы</button
  >
</div>

<div class="form-control my-5">
  <div class="relative">
    <input type="text" class="w-full lg:w-1/2 pr-16 input" placeholder="название или тэг..." bind:value={tagFilter} />
    <button class="absolute top-0 right-0 lg:right-1/2 rounded-l-none btn btn-ghost" on:click={() => setTag("")}>✕</button>
  </div>
</div>

<div class="grid grid-cols-1 lg:grid-cols-2 gap-2">
  {#each tagged as { title, slug, category, tags, description }}
    <div class="p-4 rounded-md bg-base-100">
      <a sveltekit:prefetch href="/story/{slug}"
        ><h2
          class="text-2xl hover:link"
          class:text-success={category == "сцена"}
          class:text-info={category == "персонаж"}
          class:text-error={category == "существо"}
          class:text-purple-400={category == "заклинание"}
          class:text-neutral-content={category == "предмет"}
        >
          {title}
        </h2>
      </a>
      <div class="my-2 space-x-1">
        {#each tags as tag}
          <button class="badge hover:badge-accent rounded-md" class:badge-accent={tagFilter == tag} on:click={() => setTag(tag)}
            >{tag}</button
          >
        {/each}
      </div>
      <a sveltekit:prefetch href="/story/{slug}">
        <p class="prose text-sm">
          {description.substr(0, 120)}...
        </p>
      </a>
    </div>
  {:else}
    <div class="alert">
      <div class="flex-0">
        <span class="w-8 h-8 mr-8"><MdErrorOutline /> </span>
        <span>Не найдено историй о "{tagFilter}"</span>
      </div>
    </div>
  {/each}
</div>
