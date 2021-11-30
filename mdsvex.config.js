const config = {
  extensions: [".svelte.md", ".md", ".svx"],

  smartypants: {
    dashes: "oldschool",
  },

  layout: {
    story: "./src/lib/story.svelte",
  },

  remarkPlugins: [],
  rehypePlugins: [],
};

export default config;
