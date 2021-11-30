<script context="module">
  import { page } from "$app/stores";

  const songs = import.meta.glob("./song/*.svx");
  let body = [];
  for (const path in songs) {
    body.push(songs[path]().then(({ metadata }) => metadata));
  }

  export async function load() {
    const songs = await Promise.all(body);
    return {
      props: {
        songData: songs,
      },
    };
  }
</script>

<script>
  import MdInsertLink from "svelte-icons/md/MdInsertLink.svelte";
  import MdFullscreen from "svelte-icons/md/MdFullscreen.svelte";
  import MdErrorOutline from "svelte-icons/md/MdErrorOutline.svelte";
  import About from "./about.svelte";

  export let songData;

  let tagFilter = "";

  $: tagged = songData.filter((song) => {
    return (
      song.title.toLowerCase().includes(tagFilter.toLowerCase()) ||
      song.category.toLowerCase().includes(tagFilter.toLowerCase()) ||
      song.tags.some((tag) => tag.toLowerCase().includes(tagFilter.toLowerCase()))
    );
  });

  function setTag(newTag) {
    tagFilter = newTag;
  }

  function writeClipboard(clipboardText) {
    var type = "text/plain";
    var blob = new Blob([clipboardText], { type });
    var data = [new ClipboardItem({ [type]: blob })];

    navigator.clipboard.write(data);
  }
</script>

<svelte:head>
  <title>Карманный Бард</title>
</svelte:head>

<div class="prose mb-10">
  <h1>Карманный Бард</h1>

  <h4>Историй в репертуаре: {tagged.length}</h4>
</div>

<div class="btn-group items-center my-5">
  <button class="btn btn-xs btn-success" on:click={() => setTag("сцены")}>сцены</button>
  <button class="btn btn-xs btn-error" on:click={() => setTag("персонажи")}>персонажи</button>
  <button class="btn btn-xs btn-primary" on:click={() => setTag("существа")}>существа</button>
  <button class="btn btn-xs btn-secondary" on:click={() => setTag("заклинания")}>заклинания</button>
  <button class="btn btn-xs btn-neutral" on:click={() => setTag("предметы")}>предметы</button>
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
  {#each tagged as { title, slug, category, tags, author, description }}
    <div class="card-body py-2 bg-base-100">
      <a sveltekit:prefetch href="/song/{slug}"
        ><h2
          class="text-2xl card-title"
          class:text-success={category == "сцены"}
          class:text-error={category == "персонажи"}
          class:text-primary={category == "существа"}
          class:text-secondary={category == "заклинания"}
          class:text-neutral={category == "предметы"}
        >
          {title}
        </h2>
      </a>
      <div class="mb-4 space-x-1 card-actions">
        {#each tags as tag}
          <button class="badge badge-outline rounded-md" class:text-success={tagFilter == tag} on:click={() => setTag(tag)}>{tag}</button>
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
        <span>Не найдено песен о "{tagFilter}"</span>
      </div>
    </div>
  {/each}
</div>
