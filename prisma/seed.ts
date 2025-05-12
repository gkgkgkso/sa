import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // 관리자 계정 생성
  const adminPassword = await bcrypt.hash('admin123!@#', 10)
  const admin = await prisma.user.create({
    data: {
      name: '관리자',
      email: 'admin@hazel.com',
      password: adminPassword,
      role: 'ADMIN'
    }
  })

  // 카테고리 생성
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: '가전제품',
        slug: 'electronics',
        image: '/images/categories/electronics.jpg'
      }
    }),
    prisma.category.create({
      data: {
        name: '주방용품',
        slug: 'kitchen',
        image: '/images/categories/kitchen.jpg'
      }
    }),
    prisma.category.create({
      data: {
        name: '침구/커버',
        slug: 'bedding',
        image: '/images/categories/bedding.jpg'
      }
    })
  ])

  // 샘플 상품 데이터
  const products = [
    {
      name: '선풍기',
      description: '시원한 바람을 선사하는 고급 선풍기',
      price: 59000,
      image: '/images/products/fan.jpg',
      stock: 50,
      categoryId: categories[0].id
    },
    {
      name: '프라이팬',
      description: '고급 논스틱 코팅 프라이팬',
      price: 39000,
      image: '/images/products/pan.jpg',
      stock: 30,
      categoryId: categories[1].id
    },
    {
      name: '여름 이불',
      description: '시원한 여름 이불 세트',
      price: 89000,
      image: '/images/products/summer-bedding.jpg',
      stock: 20,
      categoryId: categories[2].id
    },
    {
      name: '쿠션',
      description: '포근한 거실용 쿠션',
      price: 29000,
      image: '/images/products/cushion.jpg',
      stock: 40,
      categoryId: categories[2].id
    },
    {
      name: '스마트폰',
      description: '최신형 스마트폰',
      price: 890000,
      image: '/images/products/phone.jpg',
      stock: 10,
      categoryId: categories[0].id
    },
    {
      name: '태블릿',
      description: '고성능 태블릿',
      price: 690000,
      image: '/images/products/tablet.jpg',
      stock: 15,
      categoryId: categories[0].id
    },
    {
      name: 'LED 조명',
      description: '에너지 절약 LED 조명',
      price: 49000,
      image: '/images/products/light.jpg',
      stock: 25,
      categoryId: categories[0].id
    },
    {
      name: '밥솥',
      description: '스마트 전기 밥솥',
      price: 189000,
      image: '/images/products/ricecooker.jpg',
      stock: 20,
      categoryId: categories[1].id
    }
  ]

  await Promise.all(
    products.map(product => 
      prisma.product.create({
        data: product
      })
    )
  )

  console.log('시드 데이터가 성공적으로 생성되었습니다.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
