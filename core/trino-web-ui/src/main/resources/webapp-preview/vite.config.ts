import { ConfigEnv, defineConfig, loadEnv  } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig((mode: ConfigEnv) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const env = loadEnv(mode.mode, process.cwd());
  const baseUrl = env.VITE_BASE_URL;
  const proxyTarget = env.VITE_PROXY_TARGET || 'http://127.0.0.1:8080';
  return {
    base: baseUrl,
    plugins: [react()],
    server: {
      proxy: {
        ['/ui/preview/auth']: {
          target: proxyTarget,
          changeOrigin: true,
        },
        ['/ui/api']: {
          target: proxyTarget,
          changeOrigin: true,
        },
      }
    }
  }
})
