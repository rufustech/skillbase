/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: "#374151",
            p: {
              marginBottom: "1rem",
            },
            "h1, h2, h3, h4": {
              color: "#432010",
              marginTop: "2rem",
              marginBottom: "1rem",
            },
            a: {
              color: "#432010",
              "&:hover": {
                color: "#954535",
              },
            },
            "ul, ol": {
              marginLeft: "1.5rem",
              marginBottom: "1rem",
            },
            li: {
              marginBottom: "0.5rem",
            },
          },
        },
      },
    },
  },
  plugins: [],
};
