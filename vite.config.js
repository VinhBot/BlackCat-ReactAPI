// Import defineConfig từ Vite để tạo cấu hình
import { defineConfig } from "vite";
// Import plugin React từ Vite
import react from "@vitejs/plugin-react";
// Export cấu hình của Vite
export default defineConfig({
  // Sử dụng plugin React trong dự án
  plugins: [react()],
  // Cấu hình máy chủ (server)
  server: {
    // Cấu hình host cho máy chủ, ở đây là '0.0.0.0'
    host: '0.0.0.0'
  },
});