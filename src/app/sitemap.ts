import { MetadataRoute } from 'next'
import prisma from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 제품 목록 가져오기
  const products = await prisma.product.findMany({
    where: { isActive: true },
    select: { id: true, updatedAt: true }
  })

  // 카테고리 목록 가져오기
  const categories = await prisma.category.findMany({
    select: { slug: true, updatedAt: true }
  })

  // 정적 페이지
  const staticPages = [
    {
      url: 'https://hazels-shop.com',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1
    },
    {
      url: 'https://hazels-shop.com/products',
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.9
    },
    {
      url: 'https://hazels-shop.com/categories',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8
    }
  ]

  // 제품 페이지
  const productPages = products.map((product) => ({
    url: `https://hazels-shop.com/products/${product.id}`,
    lastModified: product.updatedAt,
    changeFrequency: 'daily',
    priority: 0.7
  }))

  // 카테고리 페이지
  const categoryPages = categories.map((category) => ({
    url: `https://hazels-shop.com/categories/${category.slug}`,
    lastModified: category.updatedAt,
    changeFrequency: 'weekly',
    priority: 0.6
  }))

  return [...staticPages, ...productPages, ...categoryPages]
}
