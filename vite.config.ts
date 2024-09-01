import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import dts from "vite-plugin-dts"

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
  ],
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
