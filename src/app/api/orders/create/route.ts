import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { items, customerInfo, totalAmount } = await req.json();

    // 주문 생성
    const order = await prisma.order.create({
      data: {
        customerId: customerInfo.id,
        status: 'AWAITING_PAYMENT',
        totalAmount,
        paymentMethod: 'BANK_TRANSFER',
        items: {
          create: items.map((item: any) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price
          }))
        }
      },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    });

    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        totalAmount: order.totalAmount,
        items: order.items.map((item: { product: { name: string }, quantity: number, price: number }) => ({
          name: item.product.name,
          quantity: item.quantity,
          price: item.price
        })),
        bankInfo: {
          bankName: '신한은행',
          accountNumber: '111-222-333444',
          accountHolder: '주식회사 SA'
        }
      }
    });
  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { success: false, error: '주문 생성에 실패했습니다.' },
      { status: 400 }
    );
  }
}
