module.exports = {
  mode: "jit",
  purge: ["./public/**/*.html", "./src/**/*.{astro,js,jsx,svelte,ts,tsx,vue}"],
  // more options here
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        black: {DEFAULT:"#000000", 100: "#0D0D0D", 900: "#F2F2F2"}
      },
      fontFamily: {
        robotoMono: ["Roboto Mono", "monospace"],
      },
    },
  },
};
