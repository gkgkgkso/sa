'use client'

import { Suspense, useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import OrderCompleteContent from '@/components/order/OrderCompleteContent'
import OrderCompleteSkeleton from '@/components/order/OrderCompleteSkeleton'

interface OrderDetails {
  id: string
  totalAmount: number
  items: Array<{
    name: string
    quantity: number
    price: number
  }>
  bankInfo: {
    bankName: string
    accountNumber: string
    accountHolder: string
  }
}

export default function OrderCompletePage() {
  const searchParams = useSearchParams()
  const [order, setOrder] = useState<OrderDetails | null>(null)
  const orderId = searchParams.get('orderId')

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`/api/orders/${orderId}`)
        const data = await response.json()
        if (data.success) {
          setOrder(data.order)
        }
      } catch (error) {
        console.error('주문 정보 조회 실패:', error)
      }
    }

    if (orderId) {
      fetchOrderDetails()
    }
  }, [orderId])

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">주문 정보를 불러오는 중...</h1>
        </div>
      </div>
    )
  }

  // 24시간 후 만료
  const expiryDate = new Date()
  expiryDate.setHours(expiryDate.getHours() + 24)

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-blue-600 text-white px-6 py-4">
          <h1 className="text-2xl font-bold">주문이 완료되었습니다</h1>
          <p className="mt-1">주문번호: {order.id}</p>
        </div>
        
        <div className="p-6">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <h2 className="text-lg font-semibold text-yellow-800 mb-3">무통장입금 안내</h2>
            <div className="space-y-2 text-yellow-800">
              <p><span className="font-medium">은행명:</span> {order.bankInfo.bankName}</p>
              <p><span className="font-medium">계좌번호:</span> {order.bankInfo.accountNumber}</p>
              <p><span className="font-medium">예금주:</span> {order.bankInfo.accountHolder}</p>
              <p><span className="font-medium">입금금액:</span> {order.totalAmount.toLocaleString()}원</p>
              <p><span className="font-medium">입금기한:</span> {expiryDate.toLocaleString('ko-KR')}</p>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <h2 className="text-lg font-semibold mb-3">주문 상품</h2>
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">수량: {item.quantity}개</p>
                  </div>
                  <p className="font-medium">{(item.price * item.quantity).toLocaleString()}원</p>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-200 mt-4 pt-4">
            <div className="flex justify-between items-center text-lg font-semibold">
              <p>총 결제금액</p>
              <p>{order.totalAmount.toLocaleString()}원</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 px-6 py-4 flex justify-center">
          <Link
            href="/orders"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            주문 내역 보기
          </Link>
        </div>
      </div>
    </div>
  )
}
