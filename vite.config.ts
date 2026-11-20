import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const { VITE_SITE_URL } = loadEnv(mode, '.', 'VITE_')
  const publicUrl = VITE_SITE_URL ? new URL(VITE_SITE_URL.replace(/\/?$/, '/')) : null
  if (publicUrl && publicUrl.protocol !== 'https:') throw new Error('VITE_SITE_URL must be the public HTTPS site URL.')
  return {
    base: './',
    esbuild: { jsx: 'automatic' },
    plugins: [{
      name: 'invitation-social-metadata',
      transformIndexHtml: {
        order: 'pre',
        handler(html) {
          if (!publicUrl) return html
          const index = html.replace(/\s*<meta property="og:image"[^>]+>/, '')
          return { html: index, tags: [
            { tag: 'link', attrs: { rel: 'canonical', href: publicUrl.href } },
            { tag: 'meta', attrs: { property: 'og:url', content: publicUrl.href } },
            { tag: 'meta', attrs: { property: 'og:image', content: new URL('assets/social-preview.jpg', publicUrl).href } },
          ] }
        },
      },
    }],
  }
})
