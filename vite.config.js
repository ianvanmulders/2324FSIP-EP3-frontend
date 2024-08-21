import { defineConfig } from "vite"
import { resolve } from "path"
import { fileURLToPath } from "node:url"
import stylelint from "vite-plugin-stylelint"
import eslint from "vite-plugin-eslint"
import { glob } from "glob"
import * as path from "path"

export default defineConfig({
  plugins: [stylelint(), eslint()],
  root: "src",
  publicDir: "../public", // relative to root
  emptyOutDir: true, // if you still want to clear outDir without warning
  build: {
    rollupOptions: {
      input: Object.fromEntries(
        glob.sync("src/**/*.html").map((file) => [
          // This remove `src/` as well as the file extension from each
          // file, so e.g. src/nested/foo.js becomes nested/foo
          path.relative(
            "src",
            file.slice(0, file.length - path.extname(file).length)
          ),
          // This expands the relative paths to absolute paths, so e.g.
          // src/nested/foo becomes /project/src/nested/foo.js
          fileURLToPath(new URL(file, import.meta.url))
        ])
      )
      /*   input: {
        main: resolve(__dirname, 'src/index.html'),
        alcohol: resolve(__dirname, 'src/index.html'),
        artisanal: resolve(__dirname, 'src/index.html'),
        cakes: resolve(__dirname, 'src/index.html'),
        calender: resolve(__dirname, 'src/index.html'),
        contact: resolve(__dirname, 'src/index.html'),
        dashboard: resolve(__dirname, 'src/detail.html'),
        ice: resolve(__dirname, 'src/index.html'),
        icetruck: resolve(__dirname, 'src/icetruck.html'),
        order: resolve(__dirname, 'src/index.html'),
        products: resolve(__dirname, 'src/products.html'),
        sorbet: resolve(__dirname, 'src/index.html'),
      },*/
    },
    outDir: "../dist/" // relative to root
  }
})
