<script context="module">
  import orderBy from "lodash/sortBy";

  const stories = import.meta.glob("./story/*.svx");

  let body = [];
  for (const path in stories) {
    body.push(stories[path]().then(({ metadata }) => metadata));
  }

  export async function load() {
    const stories = await Promise.all(body);
    return {
      props: {
        storyData: stories,
      },
    };
  }
</script>

<script>
  import MdErrorOutline from "svelte-icons/md/MdErrorOutline.svelte";
  import GiCastle from "svelte-icons/gi/GiCastle.svelte";
  import GiDwarfFace from "svelte-icons/gi/GiDwarfFace.svelte";
  import GiSpikedDragonHead from "svelte-icons/gi/GiSpikedDragonHead.svelte";
  import GiMagicSwirl from "svelte-icons/gi/GiMagicSwirl.svelte";
  import GiSwapBag from "svelte-icons/gi/GiSwapBag.svelte";

  export let storyData;

  let tagFilter = "";

  $: tagged = storyData.filter((story) => {
    return (
      story.title.toLowerCase().includes(tagFilter.toLowerCase()) ||
      story.category.toLowerCase().includes(tagFilter.toLowerCase()) ||
      story.tags.some((tag) => tag.toLowerCase().includes(tagFilter.toLowerCase()))
    );
  });

  function setTag(newTag) {
    tagFilter = newTag;
  }
</script>

<svelte:head>
  <title>Карманный Бард</title>
</svelte:head>

<div class="prose mb-10">
  <h1>Карманный Бард</h1>

  <h4>Историй в репертуаре: {tagged.length}</h4>
</div>

<div class="items-center my-2">
  <button class="btn btn-success p-1" on:click={() => setTag("сцена")}><GiCastle /></button>
  <button class="btn btn-error p-1" on:click={() => setTag("персонаж")}><GiDwarfFace /></button>
  <button class="btn btn-primary p-1" on:click={() => setTag("существо")}><GiSpikedDragonHead /></button>
  <button class="btn btn-secondary p-1" on:click={() => setTag("заклинание")}><GiMagicSwirl /></button>
  <button class="btn btn-active p-1" on:click={() => setTag("предмет")}><GiSwapBag /></button>
</div>

<div class="form-control my-5">
  <div class="relative">
    <input
      type="text"
      class="w-full lg:w-1/2 pr-16 input input-bordered"
      placeholder="название, категория, тэг..."
      bind:value={tagFilter}
    />
    <button class="absolute top-0 right-0 lg:right-1/2 rounded-l-none btn btn-ghost" on:click={() => setTag("")}>✕</button>
  </div>
</div>

<div class="grid grid-cols-1 lg:grid-cols-2 gap-2">
  {#each orderBy(tagged, "title", "asc") as { title, slug, category, tags, author, description }}
    <div class="card-body py-2 rounded-md bg-base-100">
      <a sveltekit:prefetch href="/story/{slug}"
        ><h2
          class="text-2xl card-title"
          class:text-success={category == "сцена"}
          class:text-error={category == "персонаж"}
          class:text-primary={category == "существо"}
          class:text-secondary={category == "заклинание"}
          class:text-neutral-content={category == "предмет"}
        >
          {title}
        </h2>
      </a>
      <div class="mb-4 space-x-1 card-actions">
        {#each tags as tag}
          <button class="badge rounded-md" class:text-success={tagFilter == tag} on:click={() => setTag(tag)}>{tag}</button>
        {/each}
      </div>
      <p class="prose text-sm">
        {description.substr(0, 120)}...
      </p>
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
