import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { orderId } = await req.json();    // 주문 상태 업데이트
    const order = await prisma.order.update({
      where: { id: orderId },
      data: {
        status: 'AWAITING_CONFIRMATION',
        paidAt: new Date(),
      },
    });

    return NextResponse.json({ 
      success: true,
      order: {
        id: order.id,
        status: order.status
      }
    });
  } catch (error) {
    console.error('Order status update error:', error);
    return NextResponse.json(
      { success: false, error: '주문 상태 업데이트에 실패했습니다.' },
      { status: 400 }
    );
  }
}
