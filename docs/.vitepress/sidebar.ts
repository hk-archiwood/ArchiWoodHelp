import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { DefaultTheme } from 'vitepress'

const docsDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

export interface Section {
  text: string
  link: string
  dir: string
}

// 新增分类：在这里加一项，并创建同名文件夹和 index.md。text 用英文。
// 新增文章：不用改这个文件。把 Markdown 放到对应文件夹，title 用英文。
// draft: true 的文章不会出现在左侧目录里。
export const sections: Section[] = [
  { text: 'Getting Started', link: '/getting-started/', dir: 'getting-started' },
  { text: 'Design', link: '/design/', dir: 'design' },
  { text: 'Production', link: '/production/', dir: 'production' },
  { text: 'FAQ', link: '/faq/', dir: 'faq' },
]

interface Article {
  text: string
  link: string
  order: number
}

function unquote(value: string): string {
  const trimmed = value.trim()
  const quoted = trimmed.match(/^(['"])(.*)\1$/)
  return quoted ? quoted[2] : trimmed
}

function readArticle(dir: string, filename: string): Article | null {
  if (!filename.endsWith('.md') || filename === 'index.md') {
    return null
  }

  const raw = fs.readFileSync(path.join(docsDir, dir, filename), 'utf8')
  const frontmatter = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? ''
  if (/^draft:\s*true\s*$/m.test(frontmatter)) return null

  const title = unquote(frontmatter.match(/^title:\s*(.+)$/m)?.[1] ?? '')
  const orderValue = Number(frontmatter.match(/^order:\s*(\d+)/m)?.[1] ?? '100')
  const slug = filename.slice(0, -3)

  return {
    text: title || slug,
    link: `/${dir}/${slug}`,
    order: Number.isFinite(orderValue) ? orderValue : 100,
  }
}

export function createSidebar(): DefaultTheme.SidebarItem[] {
  return sections.map((section) => {
    const articles = fs
      .readdirSync(path.join(docsDir, section.dir))
      .map((filename) => readArticle(section.dir, filename))
      .filter((article): article is Article => article !== null)
      .sort((a, b) => a.order - b.order || a.text.localeCompare(b.text, 'en'))
      .map(({ text, link }) => ({ text, link }))

    return articles.length
      ? {
          text: section.text,
          link: section.link,
          collapsed: false,
          items: articles,
        }
      : {
          text: section.text,
          link: section.link,
        }
  })
}
