import { defineConfig, configDefaults } from "vitest/config"
import path from "path"
import react from "@vitejs/plugin-react"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    exclude: [...configDefaults.exclude, "e2e/*"], // Playwright E2E 테스트 폴더 제외
  },
})
