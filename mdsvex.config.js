const config = {
  extensions: [".svelte.md", ".md", ".svx"],

  smartypants: {
    dashes: "oldschool",
  },

  layout: {
    song: "./src/lib/song.svelte",
  },

  remarkPlugins: [],
  rehypePlugins: [],
};

export default config;
