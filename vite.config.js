import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/whack-a-mole-web3-login-react/',
  plugins: [react()],
})
