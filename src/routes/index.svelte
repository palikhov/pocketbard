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

  $: tagged = storyData
    .filter((story) => {
      return (
        story.title.toLowerCase().includes(tagFilter.toLowerCase()) ||
        story.category.toLowerCase().includes(tagFilter.toLowerCase()) ||
        story.tags.some((tag) => tag.toLowerCase().includes(tagFilter.toLowerCase()))
      );
    })
    .sort(sortBy("title"));

  function setTag(newTag) {
    tagFilter = newTag;
  }

  const sortBy = (key) => {
    return (a, b) => (a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0);
  };
</script>

<svelte:head>
  <title>Карманный Бард</title>
</svelte:head>

<div class="prose mb-10">
  <h1>Карманный Бард</h1>
</div>

<div class="items-center my-2">
  <button class="btn btn-success p-1" on:click={() => setTag("сцена")}><GiCastle /></button>
  <button class="btn btn-info p-1" on:click={() => setTag("персонаж")}><GiWomanElfFace /></button>
  <button class="btn btn-error p-1" on:click={() => setTag("существо")}><GiSpikedDragonHead /></button>
  <button class="btn btn-primary p-1" on:click={() => setTag("заклинание")}><GiMagicSwirl /></button>
  <button class="btn btn-active p-1" on:click={() => setTag("предмет")}><GiLockedChest /></button>
</div>

<div class="form-control my-5">
  <div class="relative">
    <input type="text" class="w-full lg:w-1/2 pr-16 input" placeholder="название, категория, тэг..." bind:value={tagFilter} />
    <button class="absolute top-0 right-0 lg:right-1/2 rounded-l-none btn btn-ghost" on:click={() => setTag("")}>✕</button>
  </div>
</div>

<div class="grid grid-cols-1 lg:grid-cols-2 gap-2">
  {#each tagged as { title, slug, category, tags, author, description }}
    <div class="p-4 rounded-md bg-base-100">
      <a sveltekit:prefetch href="/story/{slug}"
        ><h2
          class="text-2xl hover:link"
          class:text-success={category == "сцена"}
          class:text-info={category == "персонаж"}
          class:text-error={category == "существо"}
          class:text-primary={category == "заклинание"}
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
