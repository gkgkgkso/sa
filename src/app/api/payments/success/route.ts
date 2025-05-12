import { NextResponse } from 'next/server';
import { verifyPayment } from '@/lib/portone-server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { orderId, paymentId } = await req.json();
    
    // 포트원 결제 검증
    const paymentData = await verifyPayment(paymentId);
    
    if (!paymentData.success) {
      throw new Error('결제 검증에 실패했습니다.');
    }

    // 주문 상태 업데이트
    const order = await prisma.order.update({
      where: { id: orderId },
      data: {
        status: 'PAID',
        paymentId: paymentId,
        paidAt: new Date(),
      },
    });

    // 이메일 발송
    await sendOrderConfirmationEmail(order);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { success: false, error: 'Payment verification failed' },
      { status: 400 }
    );
  }
}
