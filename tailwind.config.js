module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    rotate: {
      "-35": "-35deg",
    },
    extend: {
      fontFamily: {
        josef: ["Josefin Sans"],
        francois: ["Francois One"],
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["active", "focus"],
      brightness: ["hover"],
    },
  },
  plugins: [],
  important: true,
};
