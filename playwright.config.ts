import { defineConfig } from "@playwright/test";

export default defineConfig({
  reporter: "null",
  webServer: {
    command: "npm run build && cross-env TEST_MODE=1 npm start",
    port: 3000,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI
  },
  testDir: "./src/test/api-routes",
  use: {
    baseURL: "http://localhost:3000"
  }
});
