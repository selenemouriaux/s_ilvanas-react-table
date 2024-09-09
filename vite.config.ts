import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: "src/index.tsx",
      name: "SivTable",
      fileName: (format) => `siv-table.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "lodash", "styled-components"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          lodash: "_",
          "styled-components": "styled",
        },
      },
    },
  },
})
