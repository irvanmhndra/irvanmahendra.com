import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import type { APIContext } from 'astro'

export async function GET(context: APIContext) {
  const posts = await getCollection('blog')
  const sorted = posts.sort(
    (a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime()
  )

  return rss({
    title: "Irvan Mahendra's Blog",
    description: 'Personal thoughts on self-development and reflection, sometimes about tech.',
    site: context.site!,
    items: sorted.map((post) => ({
      title: post.data.title,
      description: post.data.excerpt,
      pubDate: post.data.publishedAt,
      link: `/blog/${post.slug}/`,
    })),
    customData: '<language>en-us</language>',
  })
}
