import { NextResponse } from "next/server"

const products = [
  {
    id: "tv-001",
    name: "삼성 QLED TV",
    description: "선명한 화질의 고성능 TV",
    price: 1500000,
    image: "/images/products/tv.jpg",
    category: "tv",
    isActive: true,
    stock: 10
  },
  {
    id: "tv-002",
    name: "LG OLED TV",
    description: "완벽한 블랙의 OLED TV",
    price: 2000000,
    image: "/images/products/tv.jpg",
    category: "tv",
    isActive: true,
    stock: 5
  },
  {
    id: "pc-001",
    name: "게이밍 PC",
    description: "초고성능 게이밍 데스크탑",
    price: 2000000,
    image: "/images/products/pc.jpg",
    category: "pc",
    isActive: true,
    stock: 8
  },
  {
    id: "pc-002",
    name: "사무용 PC",
    description: "사무용 컴퓨터",
    price: 800000,
    image: "/images/products/pc.jpg",
    category: "pc",
    isActive: true,
    stock: 15
  },
  {
    id: "mobile-001",
    name: "삼성 스마트폰",
    description: "최신형 스마트폰",
    price: 1200000,
    image: "/images/products/phone.jpg",
    category: "mobile",
    isActive: true,
    stock: 20
  },
  {
    id: "mobile-002",
    name: "애플 아이폰",
    description: "프리미엄 스마트폰",
    price: 1500000,
    image: "/images/products/phone.jpg",
    category: "mobile",
    isActive: true,
    stock: 15
  },
  {
    id: "seasonal-001",
    name: "여름 선풍기",
    description: "시원한 여름 필수템",
    price: 80000,
    image: "/images/products/fan.jpg",
    category: "seasonal",
    isActive: true,
    stock: 30
  },
  {
    id: "seasonal-002",
    name: "휴대용 선풍기",
    description: "휴대하기 편한 미니 선풍기",
    price: 30000,
    image: "/images/products/fan.jpg",
    category: "seasonal",
    isActive: true,
    stock: 50
  }
]

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    
    if (category) {
      const filteredProducts = products.filter(
        product => product.category === category && product.isActive
      )
      return NextResponse.json(filteredProducts)
    }
    
    const activeProducts = products.filter(product => product.isActive)
    return NextResponse.json(activeProducts)
  } catch (error) {
    console.error("Products API Error:", error)
    return new NextResponse(
      JSON.stringify({ error: "서버 오류가 발생했습니다." }), 
      { status: 500 }
    )
  }
}