import { defineConfig } from 'vitepress'
import { createSidebar, sections } from './sidebar'

const base = process.env.VITEPRESS_BASE || '/'

export default defineConfig({
  title: 'ArchiWood Help',
  description: 'Help for ArchiWood, the SketchUp cabinet design system',
  lang: 'en-US',
  base,
  lastUpdated: true,
  cleanUrls: true,
  head: [['link', { rel: 'icon', href: `${base}favicon.svg` }]],
  themeConfig: {
    logo: { src: '/logo.svg', alt: 'ArchiWood' },
    siteTitle: false,
    nav: sections.map(({ text, link }) => ({ text, link })),
    sidebar: createSidebar(),
    outline: [2, 3],
    docFooter: {
      prev: 'Previous',
      next: 'Next',
    },
    search: {
      provider: 'local',
    },
    footer: {
      message: 'ArchiWood Help',
    },
  },
})
