'use client'

import Link from 'next/link'
import { useEffect } from 'react'

export default function NotFound() {
  useEffect(() => {
    // 404 페이지 방문 분석
    // Google Analytics나 다른 분석 도구에 전송
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-600 mb-8">
          페이지를 찾을 수 없습니다
        </h2>
        <p className="text-gray-500 mb-8">
          요청하신 페이지가 삭제되었거나 잘못된 주소를 입력하셨습니다.
        </p>
        <div className="space-x-4">
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            홈으로 가기
          </Link>
          <Link
            href="/products"
            className="inline-block bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors"
          >
            쇼핑 계속하기
          </Link>
        </div>
      </div>
    </div>
  )
