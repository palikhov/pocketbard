<script>
  import FaGithub from "svelte-icons/fa/FaGithub.svelte";
  import FaDiscord from "svelte-icons/fa/FaDiscord.svelte";
</script>

<div class="flex items-center mb-10">
  <a sveltekit:prefetch href="/" class="flex-start flex-1"><h1 class="text-2xl md:text-3xl font-bold">Карманный Бард</h1></a>
  <a class="flex-end w-6 h-6 mr-4" href="https://github.com/Phenomen/pocketbard" target="_blank"><FaGithub /></a>
  <a class="flex-end w-6 h-6" href="https://discord.gg/Z2CXFy35WF" target="_blank"><FaDiscord /></a>
</div>
