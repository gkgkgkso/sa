import { Metadata } from 'next'

const title = "Hazel's Shop"
const description = '최고의 품질, 합리적인 가격으로 제공하는 Hazel의 온라인 쇼핑몰입니다.'

export const metadata: Metadata = {
  metadataBase: new URL('https://hazels-shop.com'),
  title: {
    default: title,
    template: `%s | ${title}`,
  },
  description,
  openGraph: {
    title,
    description,
    url: 'https://hazels-shop.com',
    siteName: title,
    locale: 'ko_KR',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-video-preview': -1,
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
  },
  verification: {
    google: '구글 서치 콘솔에서 받은 인증 코드',
    naver: '네이버 웹마스터 도구에서 받은 인증 코드',
  },
}
