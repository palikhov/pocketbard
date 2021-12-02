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
  import GiForestCamp from "svelte-icons/gi/GiForestCamp.svelte";
  import GiWomanElfFace from "svelte-icons/gi/GiWomanElfFace.svelte";
  import GiSpikedDragonHead from "svelte-icons/gi/GiSpikedDragonHead.svelte";
  import GiMagicSwirl from "svelte-icons/gi/GiMagicSwirl.svelte";
  import GiLockedChest from "svelte-icons/gi/GiLockedChest.svelte";
  import GiWhiteBook from "svelte-icons/gi/GiWhiteBook.svelte";

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

<div class="flex flex-wrap justify-between text-sm font-normal">
  <button class="btn btn-ghost btn-sm text-success flex" class:btn-active={categoryFilter == "сцена"} on:click={() => setCategory("сцена")}
    ><span class="w-5 h-5 mr-1"><GiForestCamp /></span>Сцены</button
  >
  <button class="btn btn-ghost btn-sm text-info" class:btn-active={categoryFilter == "персонаж"} on:click={() => setCategory("персонаж")}
    ><span class="w-5 h-5 mr-1"><GiWomanElfFace /></span>Персонажи</button
  >
  <button class="btn btn-ghost btn-sm text-red-500" class:btn-active={categoryFilter == "существо"} on:click={() => setCategory("существо")}
    ><span class="w-5 h-5 mr-1"><GiSpikedDragonHead /></span>Существа</button
  >
  <button
    class="btn btn-ghost btn-sm text-purple-500"
    class:btn-active={categoryFilter == "заклинание"}
    on:click={() => setCategory("заклинание")}><span class="w-5 h-5 mr-1"><GiMagicSwirl /></span>Заклинания</button
  >
  <button class="btn btn-ghost btn-sm" class:btn-active={categoryFilter == "предмет"} on:click={() => setCategory("предмет")}
    ><span class="w-5 h-5"><GiLockedChest /></span>Предметы</button
  >
  <button
    class="btn btn-ghost  btn-sm text-orange-500"
    class:btn-active={categoryFilter == "история"}
    on:click={() => setCategory("история")}><span class="w-5 h-5"><GiWhiteBook /></span>Истории</button
  >
</div>

<div class="form-control my-5">
  <div class="relative">
    <input type="text" class="w-full lg:w-1/2 pr-16 input input-bordered" placeholder="название или тэг..." bind:value={tagFilter} />
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
          class:text-red-500={category == "существо"}
          class:text-purple-500={category == "заклинание"}
          class:text-orange-500={category == "история"}
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
