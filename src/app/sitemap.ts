import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 정적 URL만 포함
  const staticUrls = [
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
  return staticUrls
}
