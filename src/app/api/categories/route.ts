import { NextResponse } from "next/server"

const categories = [
  {
    id: "tv",
    name: "TV",
    slug: "tv",
    description: "고화질 TV와 홈시어터를 만나보세요"
  },
  {
    id: "pc",
    name: "PC",
    slug: "pc",
    description: "데스크탑 PC와 주변기기를 만나보세요"
  },
  {
    id: "mobile",
    name: "모바일",
    slug: "mobile",
    description: "최신 모바일 기기를 만나보세요"
  },
  {
    id: "seasonal",
    name: "시즌상품",
    slug: "seasonal",
    description: "계절별 특가 상품을 만나보세요"
  }
]

export function GET() {
  return NextResponse.json(categories)
}