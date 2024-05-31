import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    { enforce: 'pre', ...mdx() },
    react({include : /\.(js|jsx|ts|tsx)$/ }),
  ],
  base: '/ParisStreetFinder/',
  rollupOptions: {
    output:{
        manualChunks(id) {
            if (id.indexOf("react") !== -1) { return; }
            if (id.includes('node_modules')) {
                return id.toString().split('node_modules/')[1].split('/')[0].toString();
            }
        }
    }
  }
})
