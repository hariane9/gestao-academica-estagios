import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Permite acessar o preview (produção) pelo domínio do Railway
  preview: {
    host: true,
    allowedHosts: true,
  },
  server: {
    // Redireciona /api para o backend PHP, evitando problemas de CORS.
    // Se o backend rodar em outra porta (ex: XAMPP na 8080), ajuste o target.
    proxy: {
      '/api': {
        target: 'http://localhost',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/gestao_estagios/public/index.php'),
      },
      // Arquivos enviados (PDFs) ficam em public/uploads no backend
      '/uploads': {
        target: 'http://localhost',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/uploads/, '/gestao_estagios/public/uploads'),
      },
    },
  },
})
