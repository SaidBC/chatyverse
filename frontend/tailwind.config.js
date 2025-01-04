/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        lemon: "Lemon",
      },
      screens: {
        xsm: "460px",
      },
      animation: {
        show: "show 0.5s cubic-bezier(0.075, 0.82, 0.165, 1) 1",
      },
    },
  },
  plugins: [],
};
